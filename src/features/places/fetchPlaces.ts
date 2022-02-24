import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Places } from './types'

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => {
    const response = await axios.get(`https://open-api.myhelsinki.fi/v2/places/?language_filter=en&limit=100`)
    let data: Places = response.data
    return data
  }
)   
