import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f1eb',
      paper: '#ffffff',
    },
    primary: {
      main: '#2c1810',
      contrastText: '#f5f1eb',
    },
    secondary: {
      main: '#c9a961',
    },
    info: {
      main: '#d4a574',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b5d52',
    },
  },
  typography: {
    fontFamily: "'Encode Sans', 'Helvetica Neue', Arial, sans-serif",
    h1: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.02em',
    },
    h3: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 400,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.75,
    },
    button: {
      fontFamily: "'Encode Sans', 'Helvetica Neue', Arial, sans-serif",
      fontWeight: 500,
      fontSize: '0.9rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        body: {
          margin: 0,
          backgroundColor: '#f5f1eb',
          color: '#1a1a1a',
          lineHeight: 1.75,
          overflowX: 'hidden',
        },
        'section[id]': {
          scrollMarginTop: '110px',
        },
        '.fade-in': {
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        },
        '.fade-in.is-visible': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        a: {
          color: 'inherit',
        },
      },
    },
  },
})

export { theme }
