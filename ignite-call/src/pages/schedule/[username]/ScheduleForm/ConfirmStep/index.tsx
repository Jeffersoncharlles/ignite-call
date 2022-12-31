import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import dayjs from "dayjs";
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

interface ConfirmStepProps{
  schedulingDate: Date
  onCancelConfirmation:()=>void
}


export function ConfirmStep({ schedulingDate, onCancelConfirmation }:ConfirmStepProps) {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })


  const handleConfirmSchedule = async (data: ConfirmFormData) => {
    console.log(data)
  }

  const describeDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describeTime = dayjs(schedulingDate).format('HH:mm[h]')


  return (
    <ConfirmStepContainer as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describeDate }
        </Text>
        <Text>
          <Clock />
          {describeTime}
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
        <Button type="button" onClick={onCancelConfirmation} variant={"tertiary"}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting} >Confirmar</Button>
      </FormActions>

    </ConfirmStepContainer>
  )
}
