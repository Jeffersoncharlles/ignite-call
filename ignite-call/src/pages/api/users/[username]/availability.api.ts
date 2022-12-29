// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { statusCodes } from '../../httpStatusCodes'
import { AvailabilityService } from '../../services/availabilityService'

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
  if (req.method !== 'GET') {
    res.status(statusCodes.METHOD_NOT_ALLOWED).end()
  }

  const username = String(req.query.username)
  const { date } = req.query
  if (!date) {
    res.status(statusCodes.BAD_REQUEST).json({ message: 'Date not provided.' })
  }

  const availability = new AvailabilityService()
  const result = await availability.availability({ username,date }) as any

  if (result.message) {
    return res.status(statusCodes.BAD_REQUEST).json(result.message)
  }

  return res.status(statusCodes.OK).json(result)

}
