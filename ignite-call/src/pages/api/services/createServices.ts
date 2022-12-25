import { prisma } from "../../../lib/prisma"


interface Props {
  name: string
  username:string
}


class CreateService {
  async create({ name, username }: Props) {

    const userExists = await prisma.user.findUnique({
      where: {
        username,
      }
    })

    if (userExists) {
      return {
        message: "Username already taken."
      }
    }


    const user = await prisma.user.create({
      data: {
        name,
        username
      },
    })



    return user
  }

}

export {
  CreateService
}
