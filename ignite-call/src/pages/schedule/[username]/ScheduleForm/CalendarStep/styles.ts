import { Box, styled, Text } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: '0',
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media(max-width:900px)': {
          gridTemplateColumns: '1fr', // ou seja ja uma coluna no grid
          justifySelf:'center'
        },
      },
      false: {
        width: 540, // tamanho e de 540px
        gridTemplateColumns: '1fr', // ou seja ja uma coluna no grid
      },
    },
  },
})

export const TimePicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'scroll',

  // position: 'absolute', // hack para o scroll ser do tamanho do calendar
  // top: 0,
  // bottom: 0,
  // right: 0,
  width: 280, // aqui coloca o tamanho máximo

  '@media(max-width:900px)': {
    justifySelf: 'center',
    borderTop:'1px solid $gray600',
    borderLeft: 0,
    width: 280,
    backgroundColor: '$gray800'
  },
})

export const TimePickerHeader = styled(Text, {
  fontWeight: '$medium',
  marginLeft:'$6',

  span: {
    color: '$gray200',
  },
})

export const TimePickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media(max-width:900px)': {
    gridTemplateColumns: '2fr', // ou seja ja 2 colunas no grid
  },
})

export const TimerPickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6', // da um padding no button
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
