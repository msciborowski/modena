import type { FC } from 'react'
import styled from '@emotion/styled'

const FooterRoot = styled('footer')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.background.default,
  padding: '3rem',
  textAlign: 'center',
}))

const FooterText = styled('p')({
  opacity: 0.7,
  fontSize: '0.9rem',
  margin: 0,
})

const FooterSmall = styled('p')({
  opacity: 0.7,
  fontSize: '0.8rem',
  marginTop: '1rem',
  marginBottom: 0,
})

const Footer: FC = () => (
  <FooterRoot>
    <FooterText>Modena by Cordia • ul. Jackowskiego 24, Poznań • Jeżyce</FooterText>
    <FooterSmall>© 2026 Wszystkie prawa zastrzeżone</FooterSmall>
  </FooterRoot>
)

export { Footer }
