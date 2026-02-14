import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const storyParagraphs = [
  'Jeżyce to dzielnica, która przeszła wyjątkową transformację. Z przemysłowego zakątka miasta stała się najbardziej klimatycznym miejscem w Poznaniu. Historyczna zabudowa splata się tu z nowoczesną architekturą, a lokalne kawiarnie z prestiżowymi restauracjami.',
  'Rynek Jeżycki to tętniące życiem centrum dzielnicy. Tu każda sobota to święto lokalności – farmerskie produkty, designerskie bazary, spotkania sąsiedzkie. To miejsce, które buduje społeczność i nadaje ton całej okolicy.',
  'Modena by Cordia wpisuje się w ten klimat perfekcyjnie. Prestiżowa inwestycja w sercu Jeżyc, z własnym dziedzińcem, który stanowi kameralną oazę spokoju mimo miejskiego tętna za bramą.',
]

const StorySection = styled('section')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.background.default,
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const StoryGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4rem',
  marginTop: '3rem',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },
})

const StoryHeading = styled('h3')(({ theme }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: theme.palette.secondary.main,
}))

const StoryParagraph = styled('p')({
  color: 'rgba(245, 241, 235, 0.9)',
  fontSize: '1.05rem',
  lineHeight: 1.75,
  marginBottom: '1.2rem',
})

const StoryImageWrapper = styled('div')({
  aspectRatio: '3 / 4',
  background: '#1a1a1a',
  overflow: 'hidden',
})

const StoryImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
})

const Story: FC = () => (
  <StorySection id="story">
    <SectionIntro
      title="Historia Miejsca"
      subtitle="Jeżyce to dziś jeden z najbardziej pożądanych adresów w Poznaniu"
      titleColor="#f5f1eb"
      subtitleColor="rgba(245, 241, 235, 0.9)"
      lineColor="#c9a961"
    />
    <StoryGrid>
      <div>
        <StoryHeading>Serce Poznania</StoryHeading>
        {storyParagraphs.map(paragraph => (
          <StoryParagraph key={paragraph}>{paragraph}</StoryParagraph>
        ))}
      </div>
      <StoryImageWrapper>
        <StoryImage src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600" alt="Jeżyce Poznań" loading="lazy" />
      </StoryImageWrapper>
    </StoryGrid>
  </StorySection>
)

export { Story }
