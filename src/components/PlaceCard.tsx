import { Card } from '@mui/material'

import { Place } from '../features/places/types'

type PlaceCardProps = {
  place: Place
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  return <Card sx={{ height: 120, width: '100vw', my: 1 }}>PlaceCard</Card>
}
