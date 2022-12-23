import {styled, Heading,Text} from '@ignite-ui/react'


export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px ) / 2 )',
  height:'100vh',
  // background: 'salmon',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  marginLeft: 'auto',

  '@media(max-width:600px)': {
    // flexDirection: 'column',

  }
})

export const Hero = styled('div', {
  maxWidth: '480px',
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width:600px)': {
      fontSize: '$6xl',

    }

  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
    '@media(max-width:600px)': {
      fontSize: '$lg'
    }
  },

})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',

  '@media(max-width:600px)': {
    display:'none'
  }
})
