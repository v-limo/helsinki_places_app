import { useState } from 'react'
import {
  Card,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Chip,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import RateReviewIcon from '@mui/icons-material/RateReview'

import { Box } from '@mui/system'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'

import { Place } from '../types/placeTypes'
import { selectAuth } from '../features/auth/authSlice'
import { AddReview } from './AddReview'

type PlaceCardProps = {
  place: Place | null
  index?: number
}

const styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}
Modal.setAppElement('#root')

export const PlaceCard = ({ place, index }: PlaceCardProps) => {
  const { user } = useSelector(selectAuth)
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => user && setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Card
      variant='outlined'
      sx={{
        maxHeight: 'fitContent',
        cursor: 'pointer',
        overflowY: 'auto',
        m: 1,
        backgroundColor: index === 0 ? 'pallete.primary' : 'primary',
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
              {user && <ThumbUpAltIcon />}
            </IconButton>
            <IconButton aria-label='rate-review' onClick={openModal}>
              <RateReviewIcon color={user ? 'primary' : 'disabled'} />
            </IconButton>
          </Box>
        }
        title={place?.name?.en}
        subheader={place?.location?.address?.street_address}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {place?.description?.intro?.slice(0, 50)?.concat('...')}
        </Typography>
        {place?.tags?.map(({ name }) => (
          <Chip
            label={name}
            variant='outlined'
            size='small'
            key={place.id + Math.random()}
          />
        ))}
      </CardContent>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles}
        contentLabel='Add Review'
      >
        <AddReview closeModal={closeModal} place={place?.id} />
      </Modal>

      {/* Reviews */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Card>
  )
}
