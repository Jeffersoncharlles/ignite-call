import { NextApiRequest, NextApiResponse } from "next"
import { CreateService } from "../services/createServices"
import { z } from 'zod'
import { statusCodes } from "../httpStatusCodes"
import { setCookie } from "nookies"

const validateRegister = z.object({
  name: z.string().min(3, { message: "name for 3 character" }),
  username: z.string().min(3)
})

class AuthUserController {
  async handle(req: NextApiRequest, res: NextApiResponse) {
    const createService = new CreateService()
    const { name, username } = validateRegister.parse(req.body)
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
}

export { AuthUserController }
