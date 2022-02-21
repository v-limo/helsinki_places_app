import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Loading } from '../components/Loading'
import { selectPlaces } from '../features/places/placesSlice';
import { fetchPlaces } from '../features/places/fetchPlaces';


export const Home = () => {
  const dispatch = useDispatch()
  const { places, error, isLoading } = useSelector(selectPlaces)

  useEffect(() => {
    if (Object.keys(places).length === 0) {
      dispatch(fetchPlaces())
    }
  }, [places, dispatch])

  return (
    <Container maxWidth='lg' className='App' sx={{ minHeight: '100vh' }}>
      <Box>
        {isLoading && <Loading />}
        {places && <h1>Hello</h1>}
        {error && (
          <p>
            Something went wrong <Link to={'/'}> Go back home</Link>
          </p>
        )}
      </Box>
    </Container>
  )
}
