import type { FC, FormEvent } from 'react'
import { useCallback } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const ContactSection = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const FormContainer = styled('div')({
  maxWidth: '700px',
  margin: '3rem auto 0',
})

const FormGroup = styled('div')({
  marginBottom: '2rem',
})

const Label = styled('label')(({ theme }) => ({
  display: 'block',
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.85rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.palette.text.secondary,
  marginBottom: '0.5rem',
}))

const Input = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '1rem',
  border: '1px solid #d0cac3',
  background: theme.palette.background.default,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '1rem',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.secondary.main,
  },
}))

const TextArea = styled('textarea')(({ theme }) => ({
  width: '100%',
  padding: '1rem',
  border: '1px solid #d0cac3',
  background: theme.palette.background.default,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '1rem',
  minHeight: '150px',
  resize: 'vertical',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.secondary.main,
  },
}))

const SubmitButton = styled('button')(({ theme }) => ({
  width: '100%',
  padding: '1.2rem',
  background: theme.palette.primary.main,
  color: theme.palette.background.default,
  border: `2px solid ${theme.palette.primary.main}`,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'transparent',
    color: theme.palette.primary.main,
  },
}))

const Contact: FC = () => {
  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  return (
    <ContactSection id="contact">
      <SectionIntro title="Kontakt" subtitle="Umów wizytę i przekonaj się osobiście" />
      <FormContainer>
        <form onSubmit={handleSubmit} aria-label="Formularz kontaktowy">
          <FormGroup>
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input id="name" name="name" type="text" required autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Telefon</Label>
            <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Wiadomość</Label>
            <TextArea id="message" name="message" placeholder="Jestem zainteresowany/a wizytą w mieszkaniu..." />
          </FormGroup>
          <SubmitButton type="submit">Wyślij Zapytanie</SubmitButton>
        </form>
      </FormContainer>
    </ContactSection>
  )
}

export { Contact }
