import { Button, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { Form } from "./styles"

export const ClaimUsernameForm = () => {
  return (
    <Form as="form">
      <TextInput
        size="sm"
        prefix="jefferdeveloper.com/"
        placeholder="seu-usuário"
      />
      <Button
        size="sm"
        type="submit"
      >
        <ArrowRight />
        Reservar</Button>
    </Form>
  )
}
