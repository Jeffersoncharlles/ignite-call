import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem, Container, Header } from "./styles";



export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error //dupla negação ele ja transforma em boolean
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => {
   await signIn('google')
  }

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
          {isSignedIn ? (<Button size={"sm"} disabled>Conectado <Check /></Button>)
            :
            (<Button variant={"secondary"} size="sm" onClick={handleConnectCalendar}>Conectar<ArrowRight /> </Button>)
          }
        </ConnectItem>

        {hasAuthError && (
          <AuthError size={"sm"}>
            Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button disabled={!isSignedIn} type="submit">Proximo Passo <ArrowRight /></Button>
      </ConnectBox>
    </Container>
  )
}
