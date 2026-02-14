import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const features = [
  { icon: '🚗', title: 'Miejsce Postojowe', desc: 'Własne miejsce parkingowe w podziemnym garażu' },
  { icon: '📦', title: 'Komórka Lokatorska', desc: 'Dodatkowa przestrzeń magazynowa' },
  { icon: '🌳', title: 'Prywatny Dziedziniec', desc: 'Pięknie zagospodarowany dziedziniec tylko dla mieszkańców' },
  { icon: '🏢', title: 'Prestiżowa Inwestycja', desc: 'Modena by Cordia – gwarancja jakości i standardu' },
  { icon: '✨', title: 'Gotowe do Wejścia', desc: 'Bez czekania, bez remontów, bez improwizacji' },
  { icon: '🎨', title: 'Designerskie Wnętrza', desc: 'Projekt Moosh Interiors – każdy detal przemyślany' },
]

const FeaturesSection = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const FeaturesGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '3rem',
  marginTop: '3rem',
})

const FeatureCard = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: '2.5rem 2rem',
  background: theme.palette.background.paper,
  borderRadius: '2px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}))

const FeatureIcon = styled('div')(({ theme }) => ({
  width: '60px',
  height: '60px',
  margin: '0 auto 1.5rem',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.info.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.8rem',
}))

const FeatureTitle = styled('h3')(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: theme.palette.primary.main,
}))

const FeatureText = styled('p')({
  margin: 0,
  fontSize: '1.05rem',
  lineHeight: 1.75,
})

const Features: FC = () => (
  <FeaturesSection>
    <SectionIntro title="Udogodnienia" subtitle="Wszystko, czego potrzebujesz, w zasięgu ręki" />
    <FeaturesGrid>
      {features.map(feature => (
        <FeatureCard key={feature.title}>
          <FeatureIcon aria-hidden="true">{feature.icon}</FeatureIcon>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureText>{feature.desc}</FeatureText>
        </FeatureCard>
      ))}
    </FeaturesGrid>
  </FeaturesSection>
)

export { Features }
