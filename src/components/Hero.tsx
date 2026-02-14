import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const heroImages = ['images/hero-1.jpg', 'images/hero-2.jpg', 'images/hero-4.jpg']

const HeroRoot = styled('section')(({ theme }) => ({
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  textAlign: 'center',
  color: theme.palette.background.default,
  padding: '0 2rem',
  backgroundColor: '#2c1810',
}))

const BgImage = styled('div')<{ $active: boolean }>(({ $active }) => ({
  position: 'absolute',
  inset: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  opacity: $active ? 1 : 0,
  transition: 'opacity 2s ease-in-out',
  zIndex: 0,
}))

const BgOverlay = styled('div')({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(44,24,16,0.65) 0%, rgba(74,52,40,0.65) 100%)',
  zIndex: 1,
  pointerEvents: 'none',
})

const HeroContent = styled('div')({
  position: 'relative',
  zIndex: 2,
  maxWidth: '900px',
  padding: '0 2rem',
})

const HeroTitle = styled('h1')({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '4.5rem',
  fontWeight: 400,
  marginBottom: '1.5rem',
  animation: `${fadeInUp} 1s ease`,
  '@media (max-width: 768px)': {
    fontSize: '2.8rem',
  },
})

const HeroSubtitle = styled('div')(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontSize: '1.5rem',
  fontWeight: 400,
  color: theme.palette.secondary.main,
  marginBottom: '2rem',
  letterSpacing: '0.1em',
  animation: `${fadeInUp} 1.2s ease`,
}))

const HeroDescription = styled('p')({
  fontSize: '1.15rem',
  lineHeight: 1.8,
  marginBottom: '3rem',
  opacity: 0.9,
  animation: `${fadeInUp} 1.4s ease`,
})

const CtaButton = styled('a')(({ theme }) => ({
  display: 'inline-block',
  padding: '1rem 3rem',
  background: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.9rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  border: `2px solid ${theme.palette.secondary.main}`,
  animation: `${fadeInUp} 1.6s ease`,
  '&:hover': {
    background: 'transparent',
    color: theme.palette.secondary.main,
  },
}))

const Hero: FC = () => {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <HeroRoot id="intro">
      {heroImages.map((src, i) => (
        <BgImage key={src} $active={i === activeIdx} style={{ backgroundImage: `url(${src})` }} />
      ))}
      <BgOverlay />
      <HeroContent>
        <HeroTitle>Na sprzedaż</HeroTitle>
        <HeroSubtitle>Poznań • Jeżyce • Jackowskiego 24</HeroSubtitle>
        <HeroDescription>
          Dwupokojowe mieszkanie w inwestycji Modena by Cordia w sercu Jeżyc
          <br />- wchodzisz i od razu czujesz spójność. Naturalne światło, dopracowany projekt wnętrza.
          <br />
          Tu nic nie jest przypadkowe. Każda linia, każda faktura, każdy detal gra w jednej drużynie.
          <br />
          Kultowa lokalizacja, funkcjonalność i designerskie detale.
        </HeroDescription>
        <CtaButton href="#contact">Dowiedz się więcej</CtaButton>
      </HeroContent>
    </HeroRoot>
  )
}

export { Hero }
