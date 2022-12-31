// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { statusCodes } from '../../httpStatusCodes'
import { ScheduleService } from '../../services/scheduleService'

const createSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string(),
  date: z.string().datetime(), // autoconvertam para time
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(statusCodes.METHOD_NOT_ALLOWED).end()
  }

  const username = String(req.query.username)
  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    req.body,
  )

  const schedule = new ScheduleService()
  const result = (await schedule.handle({
    username,
    name,
    email,
    observations,
    date,
  })) as any

  if (result.message) {
    return res.status(statusCodes.BAD_REQUEST).json(result.message)
  }

  return res.status(statusCodes.CREATED).end()
}
