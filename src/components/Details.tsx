import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const details = [
  { label: 'Powierzchnia', value: '42 m²' },
  { label: 'Pokoje', value: '2 pokoje' },
  { label: 'Duży balkon', value: '8 m²' },
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
    <SectionIntro title="Więcej o mieszkaniu" subtitle="42 m² przemyślanej przestrzeni dla kogoś, kto nie chce kompromisów" />
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
        <strong>Salon</strong> <br />
        Duże przeszklenia wpuszczają do wnętrza naturalne światło, które odbija się od jasnej dębowej podłogi i neutralnych ścian. W centrum
        stoi sofa obita szaro-beżową tkaniną boucle. Jej miękka faktura subtelnie przywołuje skojarzenia z tkaninami – ukłon w stronę
        odzieżowej historii miejsca. Obok ustawiono odrestaurowany fotel zaprojektowany przez Henryka Lisa typ 300-190, potocznie nazywany
        „Liskiem”. Pepitka na tkaninie to wzór znany z klasycznej garderoby, która pojawia się tu jak dyskretny cytat z przeszłości. Lekki
        regał ścienny w kolorze jasnego dębu nadaje wnętrzu strukturę, ale nie przytłacza przestrzeni.
      </DetailsParagraph>
      <DetailsParagraph>
        <strong>Kuchnia z jadalnią</strong> <br />
        Kuchnia, mimo niewielkiego metrażu i wymagającego układu z dwoma narożnikami, została zaprojektowana bardzo ergonomicznie. Dolne
        szafki wykończono dębowym dekorem, który ociepla wnętrze, natomiast górne pozostawiono w bieli, aby zachować wizualną lekkość
        zabudowy. Całość uzupełnia wysoka zabudowa w odcieniu piaskowego beżu. Detalem przyciągającym uwagę są gałki z czerwonego
        trawertynu, które wprowadzają subtelny akcent kolorystyczny. Tuż obok znajduje się jadalnia. Oryginalny okrągły stół z przełomu lat
        60/70 z ciemnego drewna kontrastuje z jasną zabudową kuchenną. Wśród krzeseł pojawia się odrestaurowany model Thonet 788
        wyprodukowany w Radomsku. Nad stołem zawieszono modernistyczną lampę, która rozprasza miękkie światło i podkreśla kameralny
        charakter tej części mieszkania.
      </DetailsParagraph>
      <DetailsParagraph>
        <strong>Łazienka</strong> <br />
        Łazienka utrzymana jest w jasnej palecie beżów i piaskowych tonów. Centralnym elementem kompozycji jest błękitna szafka umywalkowa,
        inspirowana kolorem archiwalnego płaszcza z fotografii Modeny. Nad nią zawisło lustro w burgundowej, łukowej ramie. Całość uzupełnia
        ręcznie wykonany porcelanowy różowy kinkiet zaprojektowany i wykonany przez Nodi Studio, o delikatnym świetle, który buduje
        kameralny nastrój. Strefę kąpielową z wanną wykończono gresem barwionym w masie. Skośnie pomalowany sufit subtelnie dzieli
        przestrzeń na strefy funkcjonalne, a na podłodze gorseciki z niebieskim akcentem z kolekcji Mai Ganszyniec dla marki Paradyż.
      </DetailsParagraph>
      <DetailsParagraph>
        <strong>Sypialnia</strong> <br />
        Naturalne materiały, jasne drewno i miękkie światło budują atmosferę sprzyjającą odpoczynkowi. Mimo niewielkiego metrażu przestrzeń
        zaprojektowano z dużą dbałością o detal. Obok łóżka ustawiono niewielkie dębowe biurko, które może pełnić funkcję miejsca do pracy
        zdalnej lub toaletki.
      </DetailsParagraph>
    </DetailsBody>
  </DetailsSection>
)

export { Details }
