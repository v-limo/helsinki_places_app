import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ReviewType } from '../../types/reviewTypes'
import { RootState } from '../../app/store'
const API_URL = '/api/v1/reviews'
type props = {
  place: number
  message: string
  rate: number
}

export const createReview: any = createAsyncThunk(
  'reviews/createReview',
  async (review: props, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const token = state?.auth?.user?.token
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const response = await axios.post(API_URL, review, config)
    const result: ReviewType = response.data
    return result
  }
)
