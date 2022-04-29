import { useState } from 'react'
import {
  Container,
  FormControl,
  FormLabel,
  Divider,
  Button,
  Rating,
  TextareaAutosize,
} from '@mui/material'
import {  useDispatch } from 'react-redux'
import { createReview } from '../features/reviews/createReview'

type AddReviewprops = {
  closeModal: () => void
  place?: string
}

export const AddReview = ({ closeModal, place }: AddReviewprops) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const [rate, setRate] = useState(4)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const review = {
      place: Number(place),
      message,
      rate,
    }
    if (message) {
      dispatch(createReview(review))
      closeModal()
    }
  }

  return (
    <Container>
      <FormControl>
        <FormLabel>Message</FormLabel>
        <Divider />

        <TextareaAutosize
          aria-label='minimum height'
          minRows={3}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
          placeholder='Add your comment about this place'
          style={{ width: 200 }}
        />
        <FormLabel>Out of five?</FormLabel>

        <Rating
          name='rate-place'
          defaultValue={rate}
          precision={0.5}
          value={rate}
          size='large'
          onChange={(_, newValue) => {
            setRate(newValue as number)
          }}
        />
        <Divider />

        <Button
          sx={{ mt: 2 }}
          onClick={(e) => handleSubmit(e)}
          type='submit'
          variant='contained'
          color='primary'
          size='large'
        >
          Review
        </Button>
      </FormControl>
    </Container>
  )
}
