import {
  Card,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import RateReviewIcon from '@mui/icons-material/RateReview'

import { Place } from '../features/places/types'
import { Box } from '@mui/system'

type PlaceCardProps = {
  place: Place
}

export const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <Card
      variant='outlined'
      sx={{
        maxHeight: 220,
        cursor: 'pointer',
        overflowY: 'auto',
        m: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label='review'>
            {place?.description?.images?.[0]?.url ? (
              <img
                src={place?.description?.images?.[0]?.url}
                alt={place?.name?.en?.slice(0, 1)?.toUpperCase()}
              />
            ) : (
              place?.name?.en?.slice(0, 1)?.toUpperCase()
            )}
          </Avatar>
        }
        action={
          <Box>
            <IconButton aria-label='rate-review' onClick={() => null}>
              <ThumbUpAltIcon />
            </IconButton>
            <IconButton aria-label='rate-review' onClick={() => null}>
              <RateReviewIcon />
            </IconButton>
          </Box>
        }
        title={place.name.en}
        subheader={place.location?.address?.street_address}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {place?.description?.intro?.slice(0, 50)?.concat('...')}
        </Typography>
        {/* <Typography variant='body2' color='text.secondary'>
          {place.description.body !== place.description.intro &&
            place.description.body?.slice(0, 100)?.concat('...')}
        </Typography> */}
        {place?.tags?.map(({ name }) => (
          <Chip label={name} variant='outlined' size='small' />
        ))}
      </CardContent>
      {/* <CardActions sx={{ mt: 0 }}>
        <IconButton aria-label='rate-review' onClick={() => null}>
          <RateReviewIcon />
        </IconButton>{' '}
        <IconButton aria-label='rate-review' onClick={() => null}>
          <RateReviewIcon />
        </IconButton>
      </CardActions> */}
    </Card>
  )
}
