import type { FC, FormEvent } from 'react'
import { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const CONTACT_ENDPOINT = 'https://vanderson.pl/c.php'

type ContactResponse = {
  message?: string
  ok?: boolean
}

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

const HoneypotGroup = styled('div')({
  position: 'absolute',
  left: '-9999px',
  width: 1,
  height: 1,
  overflow: 'hidden',
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
  '&[aria-invalid="true"]': {
    borderColor: '#b24837',
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
  '&[aria-invalid="true"]': {
    borderColor: '#b24837',
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
  '&:disabled': {
    cursor: 'wait',
    opacity: 0.7,
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
}))

const SubmitMessage = styled('p')<{ $variant: 'error' | 'success' }>(({ theme, $variant }) => ({
  margin: 0,
  padding: '1.35rem 1.5rem',
  fontSize: '1rem',
  lineHeight: 1.6,
  borderLeft: `3px solid ${$variant === 'success' ? theme.palette.secondary.main : '#b24837'}`,
  background: $variant === 'success' ? 'rgba(201, 169, 97, 0.12)' : 'rgba(178, 72, 55, 0.08)',
  color: $variant === 'success' ? theme.palette.primary.main : '#7f2f23',
}))

const Contact: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState<{ message: string; variant: 'error' | 'success' } | null>(null)

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmitState(null)

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        body: formData,
      })

      const data = (await response.json().catch(() => null)) as ContactResponse | null

      if (!response.ok) {
        setSubmitState({
          message: data?.message ?? 'Wystąpił błąd w trakcie wysyłania wiadomości',
          variant: 'error',
        })
        return
      }

      form.reset()
      setSubmitState({
        message: 'Wiadomość została wysłana',
        variant: 'success',
      })
    } catch {
      setSubmitState({
        message: 'Wystąpił błąd w trakcie wysyłania wiadomości',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <ContactSection id="contact" className="fade-in">
      <SectionIntro title="Kontakt" subtitle="Umów wizytę i przekonaj się osobiście" />
      <FormContainer>
        {submitState ? (
          <div aria-live="polite">
            <SubmitMessage role="status" aria-live="polite" $variant={submitState.variant}>
              {submitState.message}
            </SubmitMessage>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-label="Formularz kontaktowy">
            <HoneypotGroup aria-hidden="true">
              <Label htmlFor="website">Strona internetowa</Label>
              <Input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
            </HoneypotGroup>
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
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij Zapytanie'}
            </SubmitButton>
          </form>
        )}
      </FormContainer>
    </ContactSection>
  )
}

export { Contact }
