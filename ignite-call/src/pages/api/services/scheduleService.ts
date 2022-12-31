import dayjs from "dayjs"
import { prisma } from "../../../lib/prisma"


interface Props {
  name: string;
  email: string;
  observations: string;
  date: string;
  username: string
}


class ScheduleService {
  async handle({ username, date,email,observations,name}: Props) {


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

    const schedulingDate = dayjs(date).startOf('hour')//forcando que a hora esta sempre no começo nao teja quebrada
    if (schedulingDate.isBefore(new Date())) {
      return {
        message: 'Date is in the past.'
      }
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
      where: {
        user_id: user.id,
        date: schedulingDate.toDate(),
      },
    })

    if (conflictingScheduling) {
      return {
        message: 'There is another scheduling at the same time.'
      }
    }

    await prisma.scheduling.create({
      data: {
        name,
        email,
        observations,
        user_id:user.id,
        date: schedulingDate.toDate()
      }
    })

    return {}
  }

}

export {
  ScheduleService
}
