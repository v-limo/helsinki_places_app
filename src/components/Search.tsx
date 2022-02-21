import { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'

import { SearchCountry } from '../features/countries/countriesSlice'
import { fetchCountries } from '../features/countries/fetchCountries'

export const Search = () => {
  const [searchText, setSearchText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText((e.target as any).value?.trim().toLowerCase())
    if (searchText !== '') {
      dispatch(SearchCountry(searchText))
    } else if (!setSearchText) {
      // fetch from localStorage instead
      dispatch(fetchCountries())
    }
  }

  return (
    <Box
      sx={{
        mt: 8,
      }}
    >
      <TextField
        name='countries'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        label='Search the countries ...'
        placeholder='Search the countries by common, official or capital cities etc'
        margin='normal'
        size='medium'
        value={searchText}
        sx={{ width: '70%', height: '100%' }}
      />
    </Box>
  )
}
