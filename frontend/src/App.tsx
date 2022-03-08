import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Paper, ThemeProvider } from '@mui/material'

import { Home } from './pages/Home'
import NoMatch from './pages/NoMatch'
import { useSelector } from 'react-redux'
import { selectDarkmode } from './features/darkMode/darkModeSlice'
import { darkTheme, lightTheme } from './theme'
import { PlaceDetails } from './components/PlaceDetails'
import Layout from './pages/Layout'

const App = () => {
  let { darkMode: mode } = useSelector(selectDarkmode)
  const theme = mode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='places/:id' element={<PlaceDetails />} />
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
