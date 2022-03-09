import { useEffect } from 'react'
import { Box, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectPlaces } from '../features/places/placesSlice'
import { fetchPlaces } from '../features/places/fetchPlaces'
import { SideBar } from '../components/SideBar'
import { Loading } from '../components/Loading'
import Map from '../components/Map'
import { fetchReviews } from '../features/reviews/fetchReviews'
import { selectReview } from '../features/reviews/reviewSlice'

export const Home = () => {
  const dispatch = useDispatch()
  const { places } = useSelector(selectPlaces)
  const { reviews } = useSelector(selectReview)

  useEffect(() => {
    dispatch(fetchReviews())
    dispatch(fetchPlaces())
  }, [dispatch])

  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        mixWidth: '95vw',
        margin: 'auto',
      }}
    >
      <Map />
      <SideBar />
    </Box>
  )
}
