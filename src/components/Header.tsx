import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import {  Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectDarkmode,
  toggleDarkMode,
} from '../features/darkMode/darkModeSlice'
import LightModeIcon from '@mui/icons-material/LightMode'

export default function Bar() {
  let { darkMode } = useSelector(selectDarkmode)
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
        <Typography variant="body1" color="primary"> My Helsinki</Typography>
        <Button onClick={() => dispatch(toggleDarkMode())}>
          {!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
