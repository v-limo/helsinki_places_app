import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

import { fetchPlaces } from '../features/places/fetchPlaces'
import { SideBar } from '../components/SideBar'
import Map from '../components/Map'
import { fetchReviews } from '../features/reviews/fetchReviews'

export const Home = () => {
  const dispatch = useDispatch()

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
