import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { ConnectBox, ConnectItem, Container, Header } from "./styles";



export default function ConnectCalendar() {


  // const handleRegisterSubmit = async (data) => {

  // }

  return (
    <Container>
      <Header>
        <Heading as="h3">
          Conecte sua agenda!
        </Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>


      <ConnectBox>
        <ConnectItem>
          <Text>
            Google Calendar
          </Text>
          <Button variant={"secondary"} size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>


        <Button type="submit">Proximo Passo <ArrowRight /></Button>
      </ConnectBox>
    </Container>
  )
}
