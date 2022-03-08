import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import { Footer } from '../../frontend/src/components/Footer'
import Header from '../../frontend/src/components/Header'

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
