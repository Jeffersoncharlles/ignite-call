import { NextApiRequest, NextApiResponse } from "next"
import { z } from 'zod'
import { CreateTimeIntervals } from "../services/createTimeIntervalsService"

const timeIntervalsBodySchema = z.object({
  intervals: z.array(z.object({
    weekDay: z.number().min(0).max(6),
    startTimeInMinutes: z.number(),
    endTimeInMinutes: z.number(),
  }))
})


class CreateUserIntervalController {
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const create = new CreateTimeIntervals()
    const { intervals } = timeIntervalsBodySchema.parse(req.body)
    // const result = await create.create({ user_id:,intervals }) as any


  }
}

export { CreateUserIntervalController }
