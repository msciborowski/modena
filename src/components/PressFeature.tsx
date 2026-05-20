import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const ARTICLE_URL = 'https://dom-i-wnetrze.pl/wnetrze-z-modowa-historia-w-tle-apartament-w-inwestycji-modena-by-cordia/'
const ARTICLE_DATE = '17 maja 2026'

const pressHighlights = [
  'Publikacja pokazuje apartament jako spójną opowieść o designie, modzie i historii miejsca.',
  'Redakcja zwraca uwagę na dopracowane detale, naturalne światło i funkcjonalność 42-metrowego wnętrza.',
  'To dodatkowe potwierdzenie jakości projektu dla osób, które szukają mieszkania z charakterem, a nie kolejnego anonimowego adresu oraz dobry sposób, by najpierw poczuć klimat mieszkania, a potem umówić się na jego prezentację.',
]

const detailItems = ['Dom i Wnętrze', '42 m²', 'Jeżyce, Poznań']

const PressSection = styled('section')(({ theme }) => ({
  padding: '6rem 3rem',
  background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const PressContainer = styled('div')({
  maxWidth: '1280px',
  margin: '0 auto',
})

const PressCard = styled('article')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(280px, 0.8fr) minmax(0, 1.2fr)',
  gap: '2rem',
  padding: '2rem',
  background: theme.palette.background.paper,
  border: '1px solid rgba(201, 169, 97, 0.28)',
  boxShadow: '0 24px 60px rgba(44, 24, 16, 0.08)',
  '@media (max-width: 960px)': {
    gridTemplateColumns: '1fr',
  },
  '@media (max-width: 768px)': {
    padding: '1.5rem',
    gap: '1.5rem',
  },
}))

const ContentColumn = styled('div')({
  minWidth: 0,
})

const Badge = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.45rem 0.9rem',
  borderRadius: '999px',
  background: 'rgba(201, 169, 97, 0.14)',
  color: theme.palette.primary.main,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}))

// const ArticleTitle = styled('h3')(({ theme }) => ({
//   margin: '1.25rem 0 1rem',
//   fontFamily: "'Playfair Display', Georgia, serif",
//   fontSize: '2rem',
//   lineHeight: 1.25,
//   color: theme.palette.primary.main,
//   textWrap: 'balance',
//   '@media (max-width: 768px)': {
//     fontSize: '1.7rem',
//   },
// }))

const Lead = styled('p')(({ theme }) => ({
  margin: '0 0 1rem',
  color: theme.palette.text.secondary,
  fontSize: '1.05rem',
  lineHeight: 1.8,
}))

const HighlightList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: '1.75rem 0 0',
  display: 'grid',
  gap: '1rem',
  marginBottom: '2rem',
})

const HighlightItem = styled('li')(({ theme }) => ({
  position: 'relative',
  paddingLeft: '1.4rem',
  lineHeight: 1.7,
  color: theme.palette.text.primary,
  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: 0,
    top: 0,
    color: theme.palette.secondary.main,
    fontSize: '1.2rem',
    lineHeight: 1.4,
  },
}))

const MetaCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '1.5rem',
  padding: '1.75rem',
  background: theme.palette.primary.main,
  color: theme.palette.background.default,
}))

const MetaLabel = styled('span')(({ theme }) => ({
  display: 'block',
  marginBottom: '0.85rem',
  color: theme.palette.secondary.main,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}))

const MetaTitle = styled('p')({
  margin: 0,
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '1.5rem',
  lineHeight: 1.35,
})

const MetaText = styled('p')({
  margin: 0,
  fontSize: '1rem',
  lineHeight: 1.7,
  opacity: 0.9,
})

const DetailList = styled('ul')({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
  padding: 0,
  margin: 0,
})

const DetailItem = styled('li')(({ theme }) => ({
  padding: '0.5rem 0.8rem',
  border: `1px solid rgba(245, 241, 235, 0.22)`,
  color: theme.palette.background.default,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.85rem',
  letterSpacing: '0.04em',
}))

const ActionGroup = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.85rem',
})

const PrimaryAction = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '52px',
  padding: '0.95rem 1.5rem',
  background: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.secondary.main}`,
  textDecoration: 'none',
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'transparent',
    color: theme.palette.secondary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 3,
  },
}))

const SecondaryAction = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '52px',
  padding: '0.95rem 1.5rem',
  background: 'transparent',
  color: theme.palette.background.default,
  border: '2px solid rgba(245, 241, 235, 0.35)',
  textDecoration: 'none',
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 3,
  },
}))

const PressFeature: FC = () => (
  <PressSection id="press" className="fade-in">
    <PressContainer>
      <SectionIntro
        title="Wyróżnione przez Dom i Wnętrze"
        subtitle="Niezależna publikacja potwierdza to, co czuć już od progu: mieszkanie ma własny charakter, spójną opowieść i dopracowany detal."
      />
      <PressCard>
        <MetaCard>
          <div>
            <MetaLabel>Dom i Wnętrze • {ARTICLE_DATE}</MetaLabel>
            <MetaTitle>Wnętrze z modową historią w tle. Apartament w inwestycji Modena by Cordia</MetaTitle>
          </div>

          <DetailList aria-label="Najważniejsze informacje o publikacji">
            {detailItems.map(item => (
              <DetailItem key={item}>{item}</DetailItem>
            ))}
          </DetailList>

          <MetaText>Najpierw zobacz, jak o tym wnętrzu pisze redakcja, a potem umów się na prezentację i sprawdź je na żywo.</MetaText>

          <ActionGroup>
            <SecondaryAction
              href={ARTICLE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Przeczytaj publikację w serwisie Dom i Wnętrze"
            >
              Przeczytaj artykuł
            </SecondaryAction>
            <PrimaryAction href="#contact">Umów prezentację</PrimaryAction>
          </ActionGroup>
        </MetaCard>

        <ContentColumn>
          <Badge style={{ marginBottom: 24 }}>Publikacja redakcyjna</Badge>
          <HighlightList>
            {pressHighlights.map(item => (
              <HighlightItem key={item}>{item}</HighlightItem>
            ))}
          </HighlightList>
          <Lead>
            <a
              href="https://dom-i-wnetrze.pl/wnetrze-z-modowa-historia-w-tle-apartament-w-inwestycji-modena-by-cordia/"
              target="_blank"
              rel="noreferrer"
            >
              https://dom-i-wnetrze.pl/wnetrze-z-modowa-historia-w-tle-apartament-w-inwestycji-modena-by-cordia/
            </a>
          </Lead>
        </ContentColumn>
      </PressCard>
    </PressContainer>
  </PressSection>
)

export { PressFeature }
