import type { FC } from 'react'
import styled from '@emotion/styled'

const navLinks = [
  { label: 'Start', href: '#intro' },
  { label: 'Galeria', href: '#gallery' },
  { label: 'Historia', href: '#story' },
  { label: 'Mieszkanie', href: '#details' },
  { label: 'Lokalizacja', href: '#location' },
  { label: 'Kontakt', href: '#contact' },
]

const HeaderRoot = styled('header')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  background: 'rgba(245, 241, 235, 0.95)',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  padding: '1.5rem 0',
  borderBottom: '1px solid rgba(201, 169, 97, 0.3)',
  color: theme.palette.primary.main,
}))

const Nav = styled('nav')({
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '0 3rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '1rem',
    padding: '0 1.5rem',
  },
})

const Logo = styled('div')(() => ({
  img: {
    height: '2.2rem',
    width: 'auto',
    display: 'block',
  },
}))

const NavList = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  gap: '2.5rem',
  padding: 0,
  margin: 0,
  '@media (max-width: 768px)': {
    gap: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

const NavLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '0.9rem',
  letterSpacing: '0.05em',
  transition: 'color 0.3s ease',
  textTransform: 'uppercase',
  fontWeight: 500,
  '&:hover': {
    color: theme.palette.secondary.main,
  },
  '@media (max-width: 768px)': {
    fontSize: '0.8rem',
  },
}))

const Header: FC = () => (
  <HeaderRoot>
    <Nav aria-label="Główna nawigacja">
      <Logo>
        <img src="modena-logo.svg" alt="Modena logo" />
      </Logo>
      <NavList>
        {navLinks.map(link => (
          <li key={link.href}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </NavList>
    </Nav>
  </HeaderRoot>
)

export { Header }
