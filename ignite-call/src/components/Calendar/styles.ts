import { styled, Text } from "@ignite-ui/react";


export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding:'$6'
})


export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

})


export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  span: {
    color:'$gray200'
  }
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',//pegar todas propriedades do css padrão e remove elas
    cursor: 'pointer',
    lineHeight: 0,//lineHeight remove para tamanho ser por base do icon
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height:'$5',
    },

    '&:hover': {
      color: '$gray100',

    },

    '&:focus': {
      boxShadow:'0 0 0 2px $colors$gray100',
    },
  }
})


export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$default',//por padrão ela nao herda a fonte que esta  no html
  borderSpacing: '0.25rem',
  tableLayout: 'fixed',//algorítimo para calcular o tamanho das coluna fixed ele todas as tabelas tem mesmo tamanho

  'thead th': {
    color: '$gray200',
    fontWeight: '$medium',
    fontSize:'$sm'
  },
  'tbody:before': {
    content: '.',//como nao tem como colocar margin isso e um hack para ter margin entre o thead e o tbody
    lineHeight: '0.75rem',//12px
    color: '$gray800',//mesma cor de fundo
    display:'block'
  },//assim ele cria um elemento como . da o espaçamento mais como ele ta na mesma cor de fundo vc nunca vai ver
  'tbody td': {
    boxSizing:'border-box'
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '100%',// tem que colocar os dois para obrigar o button ter sempre mesma altura e largura
  aspectRatio: '1 / 1',//elas ter mesma altura e largura
  background: '$gray600',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$sm',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity:0.4,
  },

  '&:not(:disabled):hover': {
    background:'$gray500'
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
