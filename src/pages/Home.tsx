import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Loading } from '../components/Loading'
import { selectPlaces } from '../features/places/placesSlice'
import { fetchPlaces } from '../features/places/fetchPlaces'
import Map from '../components/Map'


export const Home = () => {
  const dispatch = useDispatch()
  const { places, error, isLoading, next, count } = useSelector(selectPlaces)

  useEffect(() => {
    dispatch(fetchPlaces())
  }, [dispatch])

  return (
    <Container maxWidth='lg' className='App' sx={{ minHeight: '100vh' }}>
      <Map /> 
    </Container>
  )
}
