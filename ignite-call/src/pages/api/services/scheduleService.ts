import dayjs from 'dayjs'
import { google } from 'googleapis'
import { prisma } from '../../../lib/prisma'
import { getGoogleOAuthToken } from '../auth/google'

interface Props {
  name: string
  email: string
  observations: string
  date: string
  username: string
}

class ScheduleService {
  async handle({ username, date, email, observations, name }: Props) {
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

    const schedulingDate = dayjs(date).startOf('hour') // forcando que a hora esta sempre no começo nao teja quebrada
    if (schedulingDate.isBefore(new Date())) {
      return {
        message: 'Date is in the past.',
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
        message: 'There is another scheduling at the same time.',
      }
    }

    const scheduling = await prisma.scheduling.create({
      data: {
        name,
        email,
        observations,
        user_id: user.id,
        date: schedulingDate.toDate(),
      },
    })
    //= =========================== conexão google api ===========================//
    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user.id),
    })

    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1, // tem que colocar 1 para validar enviar email
      requestBody: {
        summary: `meeting with ${user.name}: ${name}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
    //= =========================== conexão google api ===========================//

    return {}
  }
}

export { ScheduleService }
