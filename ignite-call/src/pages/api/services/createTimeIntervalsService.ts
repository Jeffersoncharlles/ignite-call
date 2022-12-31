import { prisma } from '../../../lib/prisma'

interface Props {
  user_id?: string
  intervals: {
    weekDay: number
    startTimeInMinutes: number
    endTimeInMinutes: number
  }[]
}

class CreateTimeIntervals {
  async create({ user_id, intervals }: Props) {
    await Promise.all(
      intervals.map((interval) => {
        return prisma.userTimeInterval.create({
          data: {
            week_day: interval.weekDay,
            time_start_in_minutes: interval.startTimeInMinutes,
            time_end_in_minutes: interval.endTimeInMinutes,
            user_id: user_id!,
          },
        })
      }),
    )
  }
}

export { CreateTimeIntervals }
