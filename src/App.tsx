import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'

function App() {
  const theme = useTheme()
  return (
    <Box sx={{ p: 4, background: theme.palette.background.default, minHeight: '100vh' }}>
      <Box sx={{ mb: 2, fontSize: 24, fontWeight: 'bold', color: theme.palette.primary.main }}>Modena</Box>
      <Button variant="contained" color="primary" sx={{ borderRadius: 2 }}>
        MUI Button
      </Button>
    </Box>
  )
}

export default App
