import { prisma } from '../../../lib/prisma'

interface Props {
  username: string
  year: string | string[] | undefined
  month: string | string[] | undefined
}

class BlockedDatesService {
  async handle({ username, year, month }: Props) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return {
        message: 'user does not exist.',
      }
    }

    const availableWeekDays = await prisma.userTimeInterval.findMany({
      select: {
        week_day: true, // pegar so o dia da semana
      },
      where: {
        user_id: user.id,
      },
    }) // retornar o dia da semana que tem no usuário

    const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
      // retornar os que nao tem disponibilidade
      return !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      )
    })

    // seg [8,9,10] - [8,9] = true // esse tem disponibilidade ainda
    // ter [8,9,10] - [8,9,10] = false  //nao tem disponibilidade

    const blockDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
      SELECT
       EXTRACT(DAY FROM S.date) AS date,
       COUNT(S.date) AS amount,
       ((UTILS.time_end_in_minutes - UTILS.time_start_in_minutes )/ 60 ) AS size

      FROM schedulings S

      LEFT JOIN users_time_intervals UTILS
        ON UTILS.week_day = WEEKDAY(DATE_ADD(S.date,INTERVAL 1 DAY))

      WHERE S.user_id = ${user.id}
        AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

      GROUP BY EXTRACT(DAY FROM S.date),
        ((UTILS.time_end_in_minutes - UTILS.time_start_in_minutes )/ 60 )

      HAVING amount >= size
    ` // toda essa query e para verificar se tem disponibilidade ou nao em algum dia por exemplo dia 3 tem 3 horários para marcar se tudo tiver lotado ele retorna que dia 3 nao ta disponível

    const blockedDates = blockDatesRaw.map((item) => item.date)

    // retornar os dias que nao tem disponibilidades
    return {
      blockedWeekDays,
      blockedDates,
    }
  }
}

export { BlockedDatesService }
