import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmStepContainer, FormActions, FormError, FormHeader } from "./styles";


const confirmFormSchema = z.object({
  name: z.string().min(3, { message:"Nome deve ter pelo menos 3 caracteres"}),
  email: z.string().email({message:"digite um email valido"}),
  observations:z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })


  const handleConfirmSchedule = async (data: ConfirmFormData) => {
    console.log(data)
  }


  return (
    <ConfirmStepContainer as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de setembro de 2022
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label >
        <Text size={"sm"}>Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name &&  <FormError size={"sm"}>{ errors.name.message}</FormError>}
      </label>

      <label >
        <Text size={"sm"}>Endereço de e-mail</Text>
        <TextInput placeholder="johndoe@exemple.com" type="email" {...register('email')} />
        {errors.email && <FormError size={"sm"}>{errors.email.message}</FormError>}
      </label>

      <label >
        <Text size={"sm"}>Observações</Text>
        <TextArea

          {...register('observations')}
        />
      </label>

      <FormActions>
        <Button type="button" variant={"tertiary"}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting} >Confirmar</Button>
      </FormActions>

    </ConfirmStepContainer>
  )
}
