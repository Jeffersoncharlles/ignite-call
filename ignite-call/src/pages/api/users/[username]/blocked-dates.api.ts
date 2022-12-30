// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { statusCodes } from '../../httpStatusCodes'
import { BlockedDatesService } from '../../services/blockedDatesService'

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
  if (req.method !== 'GET') {
    res.status(statusCodes.METHOD_NOT_ALLOWED).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query
  if (!year || !month) {
    res.status(statusCodes.BAD_REQUEST).json({ message: 'Date not provided.' })
  }

  const blocked = new BlockedDatesService()
  const result = await blocked.handle({ username, year, month }) as any

  if (result.message) {
    return res.status(statusCodes.BAD_REQUEST).json(result.message)
  }

  return res.status(statusCodes.OK).json(result)

}
