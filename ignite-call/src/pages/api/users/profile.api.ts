// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { statusCodes } from '../httpStatusCodes'
import { UpdateProfile } from '../services/updateService'

const updateProfileSchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
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

  const { bio } = updateProfileSchema.parse(req.body)
  const user_id = session?.user.id!
  const updateProfile = new UpdateProfile()
  await updateProfile.update({ user_id, bio })

  return res.status(statusCodes.NO_CONTENT).end()
}
