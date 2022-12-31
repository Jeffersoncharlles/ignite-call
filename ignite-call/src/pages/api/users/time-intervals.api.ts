// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { statusCodes } from '../httpStatusCodes'
import { CreateTimeIntervals } from '../services/createTimeIntervalsService'

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number().min(0).max(6),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  ),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(statusCodes.METHOD_NOT_ALLOWED).end()
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    res.status(statusCodes.UNAUTHORIZED).end()
  }

  const { intervals } = timeIntervalsBodySchema.parse(req.body)
  const timeIntervals = new CreateTimeIntervals()
  await timeIntervals.create({ user_id: session?.user.id, intervals })

  return res.status(statusCodes.CREATED).end()
}
