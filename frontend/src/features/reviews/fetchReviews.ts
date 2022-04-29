import { createAsyncThunk } from '@reduxjs/toolkit'
import { ReviewType } from '../../types/reviewTypes'
import axios from 'axios'

const API_URL = '/api/v1/reviews'

export const fetchReviews:any = createAsyncThunk('reviews/GetAllReviews', async () => {
  const response = await axios.get(API_URL)
  const result: ReviewType[] = response.data
  return result
})


