import { Heading, styled, Text } from "@ignite-ui/react";


export const Container = styled('div', {
  maxWidth: 852, //calendar open
  padding: '0 $4',
  margin: '$20 auto $4',//80px em cima auto para centralizar e 16px no bottom
})

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2'
  },

  [`> ${Text}`]: {
    color:'$gray400'
}

})
