import { Box, styled } from "@ignite-ui/react";



export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: '0',
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  width: 540,//tamanho e de 540px
  gridTemplateColumns:'1fr',//ou seja ja uma coluna no grid
})
