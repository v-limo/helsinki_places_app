import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Footer } from '../components/Footer'
import Header from '../components/Header'

function Layout() {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}
export default Layout
