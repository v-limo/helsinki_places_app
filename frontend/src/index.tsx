import ReactDOM from 'react-dom'
import { CssBaseline } from '@mui/material'


import App from './App'
import { Provider } from 'react-redux'
import { store } from './app/store'

import axios from 'axios'
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:5000'


ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root')
)

export {}
