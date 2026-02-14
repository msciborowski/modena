import type { FC } from 'react'
import { useState } from 'react'
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
  position: 'relative',
  '@media (max-width: 768px)': {
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
    display: 'none',
  },
})

const Hamburger = styled('button')({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'block',
    background: 'none',
    border: 'none',
    padding: 0,
    marginLeft: 'auto',
    cursor: 'pointer',
    zIndex: 1101,
  },
})

const Drawer = styled('div')({
  display: 'none',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    background: 'rgba(245, 241, 235, 0.98)',
    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
    borderBottom: '1px solid rgba(201, 169, 97, 0.2)',
    zIndex: 1100,
    padding: '1.5rem 0',
    gap: '1.2rem',
    alignItems: 'center',
    animation: 'drawerFade 0.3s',
  },
})

const DrawerLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontFamily: "'Encode Sans', sans-serif",
  fontSize: '1.2rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontWeight: 500,
  padding: '0.5rem 0',
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}))

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

const Header: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
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
        <Hamburger aria-label={drawerOpen ? 'Zamknij menu' : 'Otwórz menu'} onClick={() => setDrawerOpen(open => !open)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="7" width="32" height="3" rx="1.5" fill="#c9a961" />
            <rect y="14" width="32" height="3" rx="1.5" fill="#c9a961" />
            <rect y="21" width="32" height="3" rx="1.5" fill="#c9a961" />
          </svg>
        </Hamburger>
        {drawerOpen && (
          <Drawer>
            {navLinks.map(link => (
              <DrawerLink key={link.href} href={link.href} onClick={() => setDrawerOpen(false)}>
                {link.label}
              </DrawerLink>
            ))}
          </Drawer>
        )}
      </Nav>
    </HeaderRoot>
  )
}

export { Header }
