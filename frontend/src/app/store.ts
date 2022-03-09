import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import placesReducer from './../features/places/placesSlice'
import darkModeReducer from './../features/darkMode/darkModeSlice'
import authReducer from './../features/auth/authSlice'
import reviewsReducer from './../features/reviews/reviewSlice'

export const store = configureStore({
  reducer: {
    places: placesReducer,
    darkMode: darkModeReducer,
    auth: authReducer,
    reviews: reviewsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
