import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { z } from "zod";
import { api } from "../../../lib/axios";
import { converteTimeInMinutes } from "../../../utils/convert-time-strint-to-minutes";
import { getWeekDays } from "../../../utils/get-week-days";
import { Container, Header } from "../styles";
import { IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer, InvernalBox, ValidationError } from "./styles";


const timeIntervalsFormSchema = z.object({
  intervals: z.array(z.object({
      weekDay: z.number().min(0).max(6),
      enabled: z.boolean(),
      startTime: z.string(),
      endTime: z.string()
    }),
  )
    .length(7)//sempre vai ter 7
    .transform(internals => internals
      .filter(interval => interval.enabled)//filtrando e so pegando os que tiver enable true
     )//transformando ele em outro objetos
    .refine(internals => internals.length > 0, { message: 'você precisa selecionar pelo menos um dia da semana!' })//tem que retornar pelo menos 1
    .transform(internals => {
      return internals.map(interval => {
        //retornar so isso independe do que vem de la
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: converteTimeInMinutes(interval.startTime),
          endTimeInMinutes: converteTimeInMinutes(interval.endTime),
       }
      })
    })
    .refine(intervals => {
      //pegar todos
      return intervals.every(interval => interval.endTimeInMinutes  - 60 >= interval.startTimeInMinutes) // maior o igual o inicio
  },{message:'O horário de termino deve ser pelo menos 1h distante do inicio'})
  ,
})
//https://github.com/react-hook-form/react-hook-form/issues/9600
type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema> //tipagem antes da transformação
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema> // tipagem apos a transformação


export default function TimesInterval() {
  const { register, handleSubmit, watch, control, formState: { isSubmitting, errors } } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),//colocar a validação para funcionar
    defaultValues: {
      intervals: [
        {weekDay:0,enabled:false,startTime:'08:00',endTime:'18:00'},
        {weekDay:1,enabled:true,startTime:'08:00',endTime:'18:00'},
        {weekDay:2,enabled:true,startTime:'08:00',endTime:'18:00'},
        {weekDay:3,enabled:true,startTime:'08:00',endTime:'18:00'},
        {weekDay:4,enabled:true,startTime:'08:00',endTime:'18:00'},
        {weekDay:5,enabled:true,startTime:'08:00',endTime:'18:00'},
        {weekDay:6,enabled:false,startTime:'08:00',endTime:'18:00'},
      ]
    }
  })

  const {fields } = useFieldArray({
    name: 'intervals',
    control
  })

  const intervals = watch('intervals')
  const weekDays = getWeekDays()

  const handleSetTimeIntervals = async (data: any) => {
    //https://github.com/react-hook-form/react-hook-form/issues/9600
    const {intervals} = data as TimeIntervalsFormOutput
    await api.post('/users/time-intervals', { intervals })
  }

  return (
    <Container>
      <Header>
        <Heading as="h3">
          Quase lá
        </Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>

      <InvernalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((item,index) => {
            //fields percorrer um input
            return (
              <IntervalItem key={item.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field, fieldState, formState }) => {

                      //field.onChange(checked === true) se o checked for true ele vai passar true se nao e false
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true)
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[item.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={"sm"}
                    type="time"
                    step={60}//tempo que vai poder selecionar hora de inicio e de termino
                    {...register(`intervals.${index}.startTime`)}
                    disabled={intervals[index].enabled === false} //desabilitando se tiver false
                  />
                  <TextInput
                    size={"sm"}
                    type="time"
                    step={60}//tempo que vai poder selecionar hora de inicio e de termino
                    {...register(`intervals.${index}.endTime`)}//index para pegar a posição do input no array
                    disabled={intervals[index].enabled === false}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}

        </IntervalsContainer>
        {errors?.intervals && (
          <ValidationError size="sm">
            {errors.intervals.message}
          </ValidationError>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Próximo Passo
          <ArrowRight />
        </Button>
      </InvernalBox>
    </Container>
  )
}
