import { prisma } from "../../../lib/prisma"


interface Props {
  username: string
  year: string | string[] | undefined
  month: string | string[] | undefined
}


class BlockedDatesService {
  async handle({ username, year, month }: Props) {

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      return {
        message: 'user does not exist.'
      }
    }

    const availableWeekDays = await prisma.userTimeInterval.findMany({
      select: {
        week_day:true //pegar so o dia da semana
      },
      where: {
        user_id:user.id
      }
    })//retornar o dia da semana que tem no usuário

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(weekDay => {
      //retornar os que nao tem disponibilidade
      return !availableWeekDays.some(availableWeekDay => availableWeekDay.week_day === weekDay)
    })


    //retornar os dias que nao tem disponibilidades
    return {
      blockedWeekDays
    }
  }
}

export {
  BlockedDatesService
}
