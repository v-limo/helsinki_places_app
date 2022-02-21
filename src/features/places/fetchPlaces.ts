import { createAsyncThunk } from '@reduxjs/toolkit'
import { Place } from './types'

export const fetchPlaces = createAsyncThunk(
  'places/fetchPlaces',
  async () => {
    const response = await fetch('https://open-api.myhelsinki.fi/v2/places/?language_filter=en')
    let data: Place[] = await response.json()
    return data
  }
)   
