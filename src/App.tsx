import styled from '@emotion/styled'
import { colors } from './colors.ts'

const Root = styled('main')({
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  backgroundColor: colors.background,
})

const Title = styled('h1')({
  margin: 0,
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 400,
  fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
  letterSpacing: '0.02em',
  color: colors.text,
  textAlign: 'center',
  overflowWrap: 'anywhere',
})

export const App = () => (
  <Root>
    <Title>jackowskiego24.pl</Title>
  </Root>
)
