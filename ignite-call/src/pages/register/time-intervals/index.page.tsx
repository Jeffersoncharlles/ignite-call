import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { IntervalDay, IntervalInputs, IntervalItem, IntervalsContainer, InvernalBox } from "./styles";




export default function TimesInterval() {


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

      <InvernalBox as="form">
        <IntervalsContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput
                size={"sm"}
                type="time"
                step={60}//tempo que vai poder selecionar hora de inicio e de termino
              />
              <TextInput
                size={"sm"}
                type="time"
                step={60}//tempo que vai poder selecionar hora de inicio e de termino
              />
            </IntervalInputs>
          </IntervalItem>
        </IntervalsContainer>
        <Button type="submit">
          Próximo Passo
          <ArrowRight />
        </Button>
      </InvernalBox>
    </Container>
  )
}
