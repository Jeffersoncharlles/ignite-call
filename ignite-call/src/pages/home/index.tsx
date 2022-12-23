import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <>
      <Container>
        <Hero>
          <Heading as='h1' size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
          </Text>
          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src="/calendar.png"
            quality={100}
            width={827}
            height={400}
            alt='preview do calendário de agendamento'
            priority
          />
        </Preview>
      </Container>

    </>
  )
}
