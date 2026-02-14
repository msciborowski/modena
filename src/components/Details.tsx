import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const details = [
  { label: 'Metraż', value: '42 m²' },
  { label: 'Pokoje', value: '2 pokoje' },
  { label: 'Loggia', value: '8 m²' },
  { label: 'Lokalizacja', value: 'ul. Jackowskiego' },
]

const DetailsSection = styled('section')({
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
})

const DetailsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
})

const DetailCard = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '2rem',
  borderLeft: `3px solid ${theme.palette.secondary.main}`,
}))

const DetailLabel = styled('div')(({ theme }) => ({
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.85rem',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: theme.palette.text.secondary,
  marginBottom: '0.5rem',
}))

const DetailValue = styled('div')(({ theme }) => ({
  fontSize: '1.4rem',
  color: theme.palette.primary.main,
  fontWeight: 600,
}))

const DetailsBody = styled('div')({
  marginTop: '4rem',
  maxWidth: '900px',
})

const DetailsHeading = styled('h3')(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: theme.palette.primary.main,
}))

const DetailsParagraph = styled('p')({
  marginBottom: '1.2rem',
  fontSize: '1.05rem',
  lineHeight: 1.75,
})

const Details: FC = () => (
  <DetailsSection id="details" className="fade-in">
    <SectionIntro title="O Mieszkaniu" subtitle="42 m² przemyślanej przestrzeni dla kogoś, kto nie chce kompromisów" />
    <DetailsGrid>
      {details.map(item => (
        <DetailCard key={item.label}>
          <DetailLabel>{item.label}</DetailLabel>
          <DetailValue>{item.value}</DetailValue>
        </DetailCard>
      ))}
    </DetailsGrid>
    <DetailsBody>
      <DetailsHeading>Przestrzeń Życia</DetailsHeading>
      <DetailsParagraph>
        <strong>Salon z kuchnią</strong> – Lekkie, otwarte regały, komoda vintage i gramofon dodają charakteru i klimatu mid-century. Jasny
        dąb przełamany ciepłym fornirem niczym z lat 70. To mieszkanie dla miłośników designu i kolekcjonerów dobrych momentów.
      </DetailsParagraph>
      <DetailsParagraph>
        W mieszkaniu połączone zostały jasne kolory z delikatnymi akcentami kolorystycznymi. Na części wysokiej zabudowy znajdują się
        uchwyty z naturalnego czerwonego trawertynu. Z kolei niska zabudowa w dębowym dekorze otwierana jest za pomocą złotej listwy
        korytkowej.
      </DetailsParagraph>
      <DetailsParagraph>
        <strong>Łazienka</strong> – Przestrzeń, w której detale tworzą spójną opowieść o harmonii i funkcjonalności. Połączenie
        trawertynowych uchwytów z chromowaną armaturą, a ozdobny grzejnik w osi wanny nadaje wnętrzu eleganckiej symetrii.
      </DetailsParagraph>
      <DetailsParagraph>
        <strong>Sypialnia</strong> – Daje ciszę mimo że na dole tętni miasto. Przestrzeń, która pozwala na prawdziwy odpoczynek i
        regenerację.
      </DetailsParagraph>
    </DetailsBody>
  </DetailsSection>
)

export { Details }
