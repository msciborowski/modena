import type { FC, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { GalleryLightbox } from './GalleryLightbox.tsx'
import { SectionIntro } from './SectionIntro.tsx'

type GalleryImage = {
  alt: string
  lightboxSrc: string
  tileSrc: string
}

type LightboxImage = {
  alt: string
  src: string
}

const tileModules = import.meta.glob<string>(
  '../gallery/tiles/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  {
    eager: true,
    import: 'default',
  },
)

const lightboxModules = import.meta.glob<string>(
  '../gallery/lightbox/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  {
    eager: true,
    import: 'default',
  },
)

const getFilename = (path: string) => path.split('/').at(-1) ?? ''

const toAltText = (filename: string) => {
  const stem = filename.replace(/\.[^.]+$/, '') || 'zdjecie'
  const normalized = stem.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

const lightboxByFilename = Object.entries(lightboxModules).reduce<Record<string, string>>((acc, [path, src]) => {
  acc[getFilename(path)] = src
  return acc
}, {})

const images: GalleryImage[] = Object.entries(tileModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, tileSrc]) => {
    const filename = getFilename(path)
    const lightboxSrc = lightboxByFilename[filename] ?? tileSrc

    return {
      alt: toAltText(filename),
      lightboxSrc,
      tileSrc,
    }
  })

const GallerySection = styled('section')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: '6rem 3rem',
  '@media (max-width: 768px)': {
    padding: '4rem 1.5rem',
  },
}))

const GalleryContainer = styled('div')({
  maxWidth: '1600px',
  margin: '0 auto',
  width: '100%',
})

const GalleryGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: '1.5rem',
  marginTop: '3rem',
  '@media (max-width: 1280px)': {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
  '@media (max-width: 960px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const GalleryItem = styled('button')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  aspectRatio: '4 / 3',
  background: '#e5e1da',
  cursor: 'pointer',
  margin: 0,
  border: 'none',
  padding: 0,
  width: '100%',
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
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
}))

const Gallery: FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const isLightboxOpen = lightboxIndex !== null

  const activeImageIndex = useMemo(() => (lightboxIndex === null ? null : lightboxIndex), [lightboxIndex])

  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      images.map(image => ({
        alt: image.alt,
        src: image.lightboxSrc,
      })),
    [],
  )

  const showPrev = () => {
    setLightboxIndex(current => {
      if (current === null) {
        return null
      }
      return (current - 1 + images.length) % images.length
    })
  }

  const showNext = () => {
    setLightboxIndex(current => {
      if (current === null) {
        return null
      }
      return (current + 1) % images.length
    })
  }

  const handleTileKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setLightboxIndex(index)
    }
  }

  return (
    <GallerySection id="gallery" className="fade-in">
      <GalleryContainer>
        <SectionIntro
          title="Galeria"
          subtitle="Przestrzeń, w której designerskie detale spotykają się z funkcjonalnością. Projekt renomowanej pracowni Moosh Interiors."
        />
        <GalleryGrid>
          {images.map((image, index) => (
            <GalleryItem
              key={image.tileSrc}
              type="button"
              onClick={() => setLightboxIndex(index)}
              onKeyDown={event => handleTileKeyDown(event, index)}
              aria-label={`Otwórz zdjęcie: ${image.alt}`}
            >
              <img src={image.tileSrc} alt={image.alt} loading="lazy" />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GalleryContainer>

      {isLightboxOpen && activeImageIndex !== null ? (
        <GalleryLightbox
          activeIndex={activeImageIndex}
          images={lightboxImages}
          onClose={() => setLightboxIndex(null)}
          onPrev={showPrev}
          onNext={showNext}
        />
      ) : null}
    </GallerySection>
  )
}

export { Gallery }
