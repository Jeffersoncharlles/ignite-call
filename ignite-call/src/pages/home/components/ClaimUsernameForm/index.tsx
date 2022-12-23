import { Button, Text, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { useForm } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { z } from "zod"
import { Form, FormAnnotation } from "./styles"

const ClaimUsernameFormSchema = z.object({
  username: z.string()
    .min(3,{message:'O usuário precisa ter 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {
       message: 'O usuário apenas pode ter letras e hifens'
    })//permitir todas letras - 1 ou mais vezes so
    .transform(username=>username.toLowerCase())
  ,
})

type ClaimUsernameForData = z.infer<typeof ClaimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const { register, handleSubmit,formState:{errors} } = useForm<ClaimUsernameForData>({
    resolver: zodResolver(ClaimUsernameFormSchema)
  })


  const handleClaimUsername = async (data: ClaimUsernameForData) => {
    console.log(data)
  }

  return (
    <>
    <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
      <TextInput
        size="sm"
        prefix="jefferdeveloper.com/"
        placeholder="seu-usuário"
        {...register('username')}
      />
      <Button
        size="sm"
        type="submit"
      >
        <ArrowRight />
        Reservar</Button>

      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : 'Digite o nome de usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
