import { Avatar, Button, Heading, MultiStep, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container, FormAnnotation, Header, ProfileBox } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight } from "phosphor-react";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../api/auth/[...nextauth].api";
import { api } from "../../../lib/axios";
import { useRouter } from "next/router";



//========================================================================//
const UpdateFormSchema = z.object({
  bio: z.string()
})

type UpdateProfileFormData = z.infer<typeof UpdateFormSchema>

export default function UpdateProfile() {

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(UpdateFormSchema),
  })

  const session = useSession()
  const router = useRouter()

  const handleUpdateProfile = async (data:UpdateProfileFormData) => {
    await api.put('/users/profile', {
      bio: data.bio
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="h3">
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />
      </Header>


      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label >
          <Text>Foto de perfil</Text>
          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>
        <label >
          <Text size="sm">Sobre você</Text>
          <TextArea {...register('bio')} />
          <FormAnnotation size={"sm"}>
            Fale um pouco sobre você. Isto será exibido em sua pagina pessoal.
          </FormAnnotation>
        </label>
        <Button disabled={isSubmitting} type="submit">Finalizar<ArrowRight /></Button>
      </ProfileBox>
    </Container>
  )
}
export const getServerSideProps: GetServerSideProps = async ({req,res}) => {

  const session = await unstable_getServerSession(req, res, buildNextAuthOptions(req, res))


  return {
    props: {
      session
    }
  }
}
