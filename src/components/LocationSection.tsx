import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const locations = [
  { distance: '2 min', desc: 'pieszo do Rynku Jeżyckiego' },
  { distance: '50 m', desc: 'do przystanku tramwajowego' },
  { distance: '5 min', desc: 'do Centrum Miasta' },
  { distance: '∞', desc: 'restauracji i kawiarni w okolicy' },
]

const LocationSectionRoot = styled('section')({
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
})

const LocationGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  marginTop: '3rem',
})

const LocationItem = styled('div')(({ theme }) => ({
  padding: '1.5rem',
  background: theme.palette.background.paper,
  textAlign: 'center',
  borderRadius: '2px',
}))

const LocationDistance = styled('div')(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontSize: '2rem',
  color: theme.palette.secondary.main,
  fontWeight: 400,
  marginBottom: '0.5rem',
}))

const LocationText = styled('p')({
  margin: 0,
  fontSize: '1.05rem',
  lineHeight: 1.75,
})

const LocationBody = styled('div')({
  marginTop: '3rem',
  maxWidth: '900px',
})

const LocationParagraph = styled('p')({
  marginBottom: '1.2rem',
  fontSize: '1.05rem',
  lineHeight: 1.75,
})

const LocationSection: FC = () => (
  <LocationSectionRoot id="location" className="fade-in">
    <SectionIntro title="Lokalizacja" subtitle="Jeżyce – najbardziej pożądany adres w Poznaniu" />
    <LocationGrid>
      {locations.map(loc => (
        <LocationItem key={loc.desc}>
          <LocationDistance>{loc.distance}</LocationDistance>
          <LocationText>{loc.desc}</LocationText>
        </LocationItem>
      ))}
    </LocationGrid>
    <LocationBody>
      <LocationParagraph>
        <strong>Rynek Jeżycki</strong> to serce dzielnicy – targ, kawiarnie, restauracje, życie. Tu miasto tętni energią, a jednocześnie
        zachowuje przyjazną, kameralną atmosferę.
      </LocationParagraph>
      <LocationParagraph>
        Tramwaj za rogiem łączy Cię z całym miastem. Uniwersytet, galerie handlowe, Stary Rynek – wszystko w zasięgu kilkunastu minut.
      </LocationParagraph>
      <LocationParagraph>
        A kiedy chcesz odpocząć od miejskiego tempa – Park Sołacki i tereny zielone wokół Warty czekają tuż obok.
      </LocationParagraph>
    </LocationBody>
  </LocationSectionRoot>
)

export { LocationSection }
