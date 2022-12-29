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

    console.log(date)

    const referenteDate = dayjs(String(date))
    const isPastDate = referenteDate.endOf('day').isBefore(new Date())

    console.log(isPastDate)

    if (isPastDate) {
      return {
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

    console.log(userAvailability)

    if (!userAvailability) {
      return {
        availability: []
      }
    }
    const { time_end_in_minutes, time_start_in_minutes } = userAvailability

    const startHour = time_start_in_minutes / 60
    const endHour = time_end_in_minutes / 60

    const possibleTimes = Array.from({ length: endHour - startHour }).map((_, index) => {
      return startHour +index
    })


    return {
      possibleTimes
    }

  }

}

export {
  AvailabilityService
}
