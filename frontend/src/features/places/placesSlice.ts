import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchPlaces } from './fetchPlaces'
import { Place } from './types'

export interface placesState {
  places: Place[],
  isLoading: boolean
  error: boolean
  count: number
  next: string | null
}

const initialState = {
  places: [],
  isLoading: false,
  error: false,
  count: 0,
  next: null
} as placesState

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    sortPlaces: (state, { payload }: PayloadAction<string>) => {
      state.places = [...state.places.filter(place => place.id === payload), ...state.places.filter(place => place.id !== payload)];
    }
  },


  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(fetchPlaces.fulfilled, (state, { payload }) => {
      state.places = payload.data
      state.count = payload.meta.count
      state.next = payload.meta.next
      state.isLoading = false
    })

    builder.addCase(fetchPlaces.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})

export const { sortPlaces } =
  placesSlice.actions
export const selectPlaces = (state: RootState) => state.places
export default placesSlice.reducer
