import type { FC } from 'react'
import styled from '@emotion/styled'
import { SectionIntro } from './SectionIntro.tsx'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    alt: 'Salon z kuchnią',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    alt: 'Sypialnia',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    alt: 'Kuchnia',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    alt: 'Łazienka z trawertynem',
  },
  {
    src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    alt: 'Balkon',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
    alt: 'Dziedziniec',
  },
]

const GallerySection = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const GalleryGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '1.5rem',
  marginTop: '3rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const GalleryItem = styled('figure')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: '4 / 3',
  background: '#e5e1da',
  cursor: 'pointer',
  margin: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
    display: 'block',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    border: '2px solid transparent',
    transition: 'border-color 0.3s ease',
  },
  '&:hover::after': {
    borderColor: theme.palette.secondary.main,
  },
}))

const Gallery: FC = () => (
  <GallerySection id="gallery" className="fade-in">
    <SectionIntro
      title="Galeria"
      subtitle="Przestrzeń, w której designerskie detale spotykają się z funkcjonalnością. Projekt renomowanej pracowni Moosh Interiors."
    />
    <GalleryGrid>
      {images.map(image => (
        <GalleryItem key={image.src}>
          <img src={image.src} alt={image.alt} loading="lazy" />
        </GalleryItem>
      ))}
    </GalleryGrid>
  </GallerySection>
)

export { Gallery }
