import type { FC, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'

type GalleryImage = {
  alt: string
  src: string
}

type GalleryLightboxProps = {
  activeIndex: number
  images: GalleryImage[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const Overlay = styled('div')({
  position: 'fixed',
  inset: 0,
  zIndex: 5000,
  background: 'rgba(7, 6, 5, 0.94)',
  display: 'grid',
  placeItems: 'center',
  padding: '1.5rem',
})

const Content = styled('div')({
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  position: 'relative',
})

const Image = styled('img')({
  maxWidth: 'calc(100vw - 7rem)',
  maxHeight: 'calc(100vh - 7rem)',
  width: 'auto',
  height: 'auto',
  objectFit: 'contain',
  display: 'block',
  '@media (max-width: 768px)': {
    maxWidth: 'calc(100vw - 2.5rem)',
    maxHeight: 'calc(100vh - 7rem)',
  },
})

const Button = styled('button')(({ theme }) => ({
  border: 'none',
  width: '3rem',
  height: '3rem',
  background: 'rgba(0, 0, 0, 0.45)',
  color: theme.palette.background.default,
  cursor: 'pointer',
  fontSize: '1.4rem',
  lineHeight: 1,
  display: 'grid',
  placeItems: 'center',
  transition: 'background 0.2s ease',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.75)',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
}))

const CloseButton = styled(Button)({
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  zIndex: 5001,
})

const PrevButton = styled(Button)({
  position: 'fixed',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 5001,
})

const NextButton = styled(Button)({
  position: 'fixed',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 5001,
})

const GalleryLightbox: FC<GalleryLightboxProps> = ({ activeIndex, images, onClose, onNext, onPrev }) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const activeImage = images[activeIndex]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft') {
        onPrev()
      } else if (event.key === 'ArrowRight') {
        onNext()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose, onNext, onPrev])

  const onOverlayKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClose()
    }
  }

  return createPortal(
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label={`Podgląd zdjęcia: ${activeImage.alt}`}
      onClick={onClose}
      onKeyDown={onOverlayKeyDown}
    >
      <CloseButton ref={closeRef} type="button" aria-label="Zamknij podgląd" onClick={onClose}>
        ×
      </CloseButton>
      <PrevButton
        type="button"
        aria-label="Poprzednie zdjęcie"
        onClick={event => {
          event.stopPropagation()
          onPrev()
        }}
      >
        ‹
      </PrevButton>
      <NextButton
        type="button"
        aria-label="Następne zdjęcie"
        onClick={event => {
          event.stopPropagation()
          onNext()
        }}
      >
        ›
      </NextButton>
      <Content>
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          onClick={event => event.stopPropagation()}
          loading="eager"
        />
      </Content>
    </Overlay>,
    document.body,
  )
}

export { GalleryLightbox }
