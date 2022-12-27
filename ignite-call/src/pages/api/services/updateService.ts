import { prisma } from "../../../lib/prisma"


interface Props {
  user_id: string
  bio:string
}


class UpdateProfile {
  async update({ user_id,bio }: Props) {
    await prisma.user.update({
      where: {
        id:user_id
      },
      data: {
        bio
      }
    })


  }
}

export {
  UpdateProfile
}
