import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CacheProvider value={createCache({ key: 'css', prepend: true })}>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>,
)
