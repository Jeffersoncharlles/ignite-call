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

    // seg [8,9,10] - [8,9] = true // esse tem disponibilidade ainda
    //ter [8,9,10] - [8,9,10] = false  //nao tem disponibilidade

    const blockDatesRaw = await prisma.$queryRaw`
      SELECT *
      FROM schedulings S
      WHERE S.user_id ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}
    `


    //retornar os dias que nao tem disponibilidades
    return {
      blockedWeekDays,
      blockDatesRaw
    }
  }
}

export {
  BlockedDatesService
}
