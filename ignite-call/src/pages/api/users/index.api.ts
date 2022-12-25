// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { z } from 'zod'
import { statusCodes } from '../httpStatusCodes'
import { CreateService } from '../services/createServices'

const validateRegister = z.object({
  name: z.string().min(3, {message:"name for 3 character"}),
  username:z.string().min(3)
})

export default  async function handler(req: NextApiRequest, res: NextApiResponse,) {
  if (req.method !== 'POST') {
    res.status(statusCodes.METHOD_NOT_ALLOWED).end()
  }

  const { name, username } = validateRegister.parse(req.body)
  const createService = new CreateService()
  const result = await createService.create({ name, username }) as any
  if (result.message) {
    return res.status(statusCodes.BAD_REQUEST).json({ message: "Username already taken." })
  }

  setCookie({ res }, '@ignitecall:userId', result.id, {
    maxAge: 60 * 60 * 24 * 7, //7 days
    path: '/' // rotas disponível todas
  })

  return res.status(statusCodes.OK).json(result)

}
