import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Search } from '../components/Search'
import { Countries } from '../components/Countries'
import { Loading } from '../components/Loading'
import { TableHead } from '../components/TableHead'

import { fetchCountries } from '../features/countries/fetchCountries'
import { selectCountries } from '../features/countries/countriesSlice'

// type Homeprops = {

// }
export const Home = () => {
  const dispatch = useDispatch()
  const { countries, error, isLoading } = useSelector(selectCountries)

  useEffect(() => {
    //persist later
    if (Object.keys(countries).length === 0) {
      dispatch(fetchCountries())
    }
  }, [countries, dispatch])

  return (
    <Container maxWidth='lg' className='App' sx={{ minHeight: '100vh' }}>
      <Search />
      <TableHead />
      <Box>
        {isLoading && <Loading />}
        {countries && <Countries countries={countries} />}
        {error && (
          <p>
            Something went wrong <Link to={'/'}> Go back home</Link>
          </p>
        )}
      </Box>
    </Container>
  )
}
