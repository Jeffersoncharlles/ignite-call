import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../lib/axios";
import { Container, Form, FormError, Header } from "./styles";

//========================================================================//
const registerFormSchema = z.object({
  username: z.string()
    .min(3, { message: 'O usuário precisa ter 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário apenas pode ter letras e hifens'
    })//permitir todas letras - 1 ou mais vezes so
    .transform(username => username.toLowerCase())
  ,
  fullName: z.string().min(3, { message: 'O nome deve conter pelo menos 3 letras' })
})

type registerFormData = z.infer<typeof registerFormSchema>

//========================================================================//

export default function Register() {
//===============================================================================//
  const { register, handleSubmit,setValue, formState: { errors, isSubmitting } } = useForm<registerFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()
//===============================================================================//
  const handleRegisterSubmit =async (data: registerFormData) => {
    try {
      await api.post('/users', {
        name: data.fullName,
        username:data.username
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
        return;
      }
      console.log(error)
    }
  }
//===============================================================================//
  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
      //pegando o valor da query na url e setando ele automaticamente
    }

  },[router.query?.username,setValue])
//===============================================================================//
  return (
    <>
    <NextSeo
        title='Crie uma conta  | Ignite call'
        description='Criei sua conta para se conectar.'
      />

    <Container>
      <Header>
        <Heading as="h3">
          Bem-vindo ao Ignite Call!
        </Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />
      </Header>
      <Form as="form" onSubmit={handleSubmit(handleRegisterSubmit)}>
        <label >
          <Text size="sm">Nome de usuário</Text>
          <TextInput prefix="jefferdeveloper.com/" placeholder="seu-usuário" {...register('username')} />
          {errors?.username && (
            <FormError size="sm">
              { errors.username.message}
            </FormError>
          )}
        </label>
        <label >
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('fullName')} />
          {errors?.fullName && (
            <FormError size="sm">
              {errors.fullName.message}
            </FormError>
          )}
        </label>
        <Button disabled={isSubmitting} type="submit">Proximo Passo <ArrowRight /></Button>
      </Form>

      </Container>
    </>
  )
}
