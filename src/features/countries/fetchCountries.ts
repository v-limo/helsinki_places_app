import { createAsyncThunk } from '@reduxjs/toolkit'
import { CountryTypes } from './types'

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    let data: CountryTypes[] = await response.json()
    return data
  }
)   
