import { configureStore } from '@reduxjs/toolkit'

import placesReducer from '../../../src/features/places/placesSlice'
import darkModeReducer from '../../../src/features/darkMode/darkModeSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    places: placesReducer,
    darkMode: darkModeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
