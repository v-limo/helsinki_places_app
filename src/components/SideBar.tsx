import { Box, Card, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectPlaces } from '../features/places/placesSlice'
import { Loading } from './Loading'
import { PlaceCard } from './PlaceCard'

export const SideBar = () => {
  const { places, error, isLoading, next, count } = useSelector(selectPlaces)

  return (
    <Box sx={{ flex: 1, height: '100vh', mt: '64px', overflow: 'auto' }}>
      <Typography variant='h5' color='primary'>
        My Helsinki Places
      </Typography>
      {isLoading && <Loading />}
      {places &&
        places.map((place) => (
          <Card sx={{}}>
            <PlaceCard place={place} />
          </Card>
        ))}
    </Box>
  )
}
