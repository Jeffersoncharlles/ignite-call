import { CreateService } from "../services/createServices"

interface Props{
  name: string
  username:string
}

class CreateController {
  async handle({ name, username }: Props) {
    const create = new CreateService()
    const result = await create.create({ name, username })
    return result
  }
}

export {CreateController}
