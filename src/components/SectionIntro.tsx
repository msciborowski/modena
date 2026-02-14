import type { FC } from 'react'
import styled from '@emotion/styled'

type SectionIntroProps = {
  title: string
  subtitle: string
  align?: 'left' | 'center'
  titleColor?: string
  subtitleColor?: string
  lineColor?: string
}

type WrapperProps = {
  align: 'left' | 'center'
}

type TitleProps = {
  titleColor?: string
  lineColor?: string
}

type SubtitleProps = {
  subtitleColor?: string
}

const IntroWrapper = styled('div')<WrapperProps>(({ align }) => ({
  textAlign: align,
  maxWidth: '800px',
  margin: '0 auto 4rem',
}))

const IntroTitle = styled('h2')<TitleProps>(({ theme, titleColor, lineColor }) => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 400,
  fontSize: '2.5rem',
  marginBottom: '2rem',
  position: 'relative',
  display: 'inline-block',
  letterSpacing: '0.02em',
  color: titleColor ?? theme.palette.text.primary,
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '60px',
    height: '2px',
    background: lineColor ?? theme.palette.secondary.main,
  },
  '@media (max-width: 768px)': {
    fontSize: '2rem',
  },
}))

const IntroSubtitle = styled('p')<SubtitleProps>(({ theme, subtitleColor }) => ({
  margin: 0,
  fontSize: '1.05rem',
  lineHeight: 1.75,
  color: subtitleColor ?? theme.palette.text.secondary,
}))

const SectionIntro: FC<SectionIntroProps> = ({ title, subtitle, align = 'center', titleColor, subtitleColor, lineColor }) => (
  <IntroWrapper align={align}>
    <IntroTitle titleColor={titleColor} lineColor={lineColor}>
      {title}
    </IntroTitle>
    <IntroSubtitle subtitleColor={subtitleColor}>{subtitle}</IntroSubtitle>
  </IntroWrapper>
)

export { SectionIntro }
