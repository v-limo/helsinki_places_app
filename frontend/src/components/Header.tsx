import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Button, Typography, Box, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { Login } from './Login'
import {
  selectDarkmode,
  toggleDarkMode,
} from '../features/darkMode/darkModeSlice'
import LightModeIcon from '@mui/icons-material/LightMode'
import { selectAuth, logout } from '../features/auth/authSlice'

export default function Bar() {
  let { darkMode } = useSelector(selectDarkmode)
  const { user } = useSelector(selectAuth)
  let dispatch = useDispatch()
  return (
    <AppBar sx={{ backgroundColor: 'background.default' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' color='primary'>
          My Helsinki
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={() => {
                  dispatch(logout())
                }}
              >
                Logout
              </Button>
              <Avatar alt={user.name} src={user?.picture}>
                {user?.picture || user.name?.[0].toUpperCase()}
              </Avatar>
            </Box>
          ) : (
            <Login />
          )}

          <Button onClick={() => dispatch(toggleDarkMode())}>
            {!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
