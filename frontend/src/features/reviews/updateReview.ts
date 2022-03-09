import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ReviewType } from '../../types/reviewTypes'
import { RootState } from '../../app/store'

const API_URL = '/api/v1/reviews'

export const updateReview = createAsyncThunk('reviews/updateReview', async (id: string, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const token = state?.auth?.user?.token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.get(`${API_URL}/${id}`, config)
  const result: ReviewType = response.data
  return result
})