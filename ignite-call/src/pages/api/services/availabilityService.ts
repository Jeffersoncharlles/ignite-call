import dayjs from "dayjs"
import { prisma } from "../../../lib/prisma"


interface Props {
  date: string | string[] | undefined
  username: string
}


class AvailabilityService {
  async availability({ username, date }: Props) {

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return {
        message:'user does not exist.'
      }
    }

    const referenteDate = dayjs(String(date))
    const isPastDate = referenteDate.endOf('day').isBefore(new Date()) // casa a data que a pessoa esteja ja tenha passado

    if (isPastDate) {
      return {
        possibleTimes:[],
        availability:[]
      }
    }

    //validando  TimeInterval and scheduling

    const userAvailability = await prisma.userTimeInterval.findFirst({
      //buscando intervalo de tempo que esta disponível onde o dia da semana que bate exatamente com a data que foi passada
      where: {
        user_id: user.id,
        week_day: referenteDate.get('day')
      }
    })



    if (!userAvailability) {
      return {
        possibleTimes: [],
        availability: []
      }
    }
    const { time_end_in_minutes, time_start_in_minutes } = userAvailability

    const startHour = time_start_in_minutes / 60 //hora que começa
    const endHour = time_end_in_minutes / 60 //hora que termina
    //pegando todas as horas do dia como ta salvo em minutos transformar elas em horas

    const possibleTimes = Array.from({ length: endHour - startHour }).map((_, index) => {
      return startHour +index
    })

    //gte = greater than or equal = todos os valores onde a data seja maior que ou igual
    const blockedTimes = await prisma.scheduling.findMany({
      //vai trazer so a data
      select: {
        date:true
      },
      where: {
        user_id: user.id,//todos agendamentos feito com esse usuário entre os dois intervalos
        date: {
          gte: referenteDate.set('hour', startHour).toDate(),
          lte: referenteDate.set('hour',endHour).toDate(),
        }
      }
    })

    //percorrer todos os horários possível filtrando eles
    const availabilityTimes = possibleTimes.filter(time => {
      const isTimeBlocked = blockedTimes.some(blockedTime => blockedTime.date.getHours() === time)
      //validar que nao existe pelo menos 1
      // onde bate esse horário com a hora de agendamento ou seja nao pode marcar dois na mesma hora

      const isTimeInPast = referenteDate.set('hour', time).isBefore(new Date()) //validando se ela esta no passado

      return !isTimeBlocked && ! isTimeInPast
    })

    return {
      possibleTimes,
      availabilityTimes
    }

  }

}

export {
  AvailabilityService
}
