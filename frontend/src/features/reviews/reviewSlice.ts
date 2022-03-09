import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteReview } from "./deleteReview";
import { RootState } from '../../app/store'
import { ReviewType } from '../../types/reviewTypes'
import { fetchReviews } from './fetchReviews';
import { updateReview } from "./updateReview"
import { createReview } from './createReview';

type reviewState = {
  reviews: ReviewType[]
  isLoading: boolean
  error: boolean
}

const initialState = {
  reviews: [],
  isLoading: false,
  error: false,
} as reviewState

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    logout(state: reviewState, action: PayloadAction) {
      state.isLoading = false
      state.error = false
      state.reviews = []
    }
  },

  extraReducers: (builder) => {
    // FetchAllReviews
    builder.addCase(fetchReviews.pending, (state) => {
      state.isLoading = true
      state.reviews = []
      state.error = false
    })

    builder.addCase(fetchReviews.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.reviews = []
      state.reviews = payload
    })

    builder.addCase(fetchReviews.rejected, (state) => {
      state.isLoading = false
      state.error = true
      state.reviews = []
    })

    // Delete A Review
    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true
      state.reviews = []
      state.error = false
    })

    builder.addCase(deleteReview.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.reviews = state.reviews?.filter(review => review._id !== payload._id)   //needs update
    })

    builder.addCase(deleteReview.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })

    //  Update review
    builder.addCase(updateReview.pending, (state) => {
      state.isLoading = true
      state.reviews = []
      state.error = false
    })

    builder.addCase(updateReview.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.reviews.filter(review => review._id !== payload._id)
      state.reviews.push(payload)
    })

    builder.addCase(updateReview.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
    builder.addCase(createReview.pending, (state) => {
      state.isLoading = true
      state.error = false
    })

    builder.addCase(createReview.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.reviews.push(payload)
    })

    builder.addCase(createReview.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})

export const { logout } = reviewsSlice.actions
export const selectReview = (state: RootState) => state.reviews
export default reviewsSlice.reducer
