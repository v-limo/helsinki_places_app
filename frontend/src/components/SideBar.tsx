import { Box, Card, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectPlaces } from './../features/places/placesSlice'
import { Loading } from './Loading'
import { PlaceCard } from './PlaceCard'

export const SideBar = () => {
  const { places, isLoading } = useSelector(selectPlaces)

  return (
    <Box
      sx={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Typography sx={{ mt: '65px' }} variant='h5' color='primary'>
        My Helsinki Places
      </Typography>
      {isLoading && <Loading />}
      {places &&
        places.map((place, index) => (
          <PlaceCard
            key={place.id + Math.random()}
            index={index}
            place={place}
          />
        ))}
    </Box>
  )
}
