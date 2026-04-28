import type { FC } from 'react'
import styled from '@emotion/styled'

const PHONE_NUMBER = '+48 536 024 267'
const PHONE_NUMBER_LINK = 'tel:+48536024267'

const PhoneSection = styled('section')(({ theme }) => ({
  background: theme.palette.background.default,
  padding: '3.5rem 3rem 2rem',
  '@media (max-width: 768px)': {
    padding: '2.5rem 1.5rem 1.5rem',
  },
}))

const PhoneCard = styled('div')(({ theme }) => ({
  maxWidth: '1160px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.1fr) minmax(260px, 0.9fr)',
  gap: '2rem',
  alignItems: 'center',
  background: theme.palette.background.paper,
  padding: '2.5rem 3rem',
  borderTop: `3px solid ${theme.palette.secondary.main}`,
  boxShadow: '0 18px 48px rgba(44, 24, 16, 0.08)',
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
    padding: '2rem 1.5rem',
  },
}))

const PhoneContent = styled('div')({
  minWidth: 0,
})

const Eyebrow = styled('p')(({ theme }) => ({
  margin: '0 0 0.85rem',
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: theme.palette.secondary.main,
}))

const Heading = styled('h2')(({ theme }) => ({
  margin: '0 0 1rem',
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '2.35rem',
  fontWeight: 400,
  lineHeight: 1.2,
  color: theme.palette.primary.main,
  '@media (max-width: 768px)': {
    fontSize: '1.95rem',
  },
}))

const Description = styled('p')(({ theme }) => ({
  margin: 0,
  maxWidth: '38rem',
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: theme.palette.text.secondary,
}))

const PhoneDetails = styled('div')({
  display: 'grid',
  gap: '0.75rem',
  justifyItems: 'start',
  paddingLeft: '2rem',
  borderLeft: '1px solid rgba(107, 93, 82, 0.18)',
  '@media (max-width: 900px)': {
    paddingLeft: 0,
    paddingTop: '1.5rem',
    borderLeft: 'none',
    borderTop: '1px solid rgba(107, 93, 82, 0.18)',
  },
})

const PhoneLabel = styled('span')(({ theme }) => ({
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.82rem',
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
}))

const PhoneLink = styled('a')(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '2rem',
  fontWeight: 400,
  lineHeight: 1.15,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  wordBreak: 'break-word',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 4,
  },
  '@media (max-width: 768px)': {
    fontSize: '1.65rem',
  },
}))

const PhoneNote = styled('p')(({ theme }) => ({
  margin: 0,
  fontSize: '0.95rem',
  lineHeight: 1.6,
  color: theme.palette.text.secondary,
}))

const PhoneContactSection: FC = () => (
  <PhoneSection className="fade-in" aria-labelledby="phone-contact-title">
    <PhoneCard>
      <PhoneContent>
        <Eyebrow>Szybki Kontakt</Eyebrow>
        <Heading id="phone-contact-title">Zadzwoń i umów prezentację mieszkania</Heading>
        <Description>
          Jeśli chcesz od razu porozmawiać o mieszkaniu, terminie prezentacji albo szczegółach oferty, najszybciej skontaktujesz się
          telefonicznie.
        </Description>
      </PhoneContent>
      <PhoneDetails>
        <PhoneLabel>Numer telefonu</PhoneLabel>
        <PhoneLink href={PHONE_NUMBER_LINK} aria-label={`Zadzwoń pod numer ${PHONE_NUMBER}`}>
          {PHONE_NUMBER}
        </PhoneLink>
        <PhoneNote>Dostępny kontakt telefoniczny w sprawie mieszkania i prezentacji.</PhoneNote>
      </PhoneDetails>
    </PhoneCard>
  </PhoneSection>
)

export { PhoneContactSection }
