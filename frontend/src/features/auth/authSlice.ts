import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USerType } from "./types";
import { RootState } from '../../app/store'
import { googleLogin } from './googleLogin'


type authState = {
  user: USerType | null
  isLoading: boolean
  error: boolean
}

const initialState = {
  user: JSON.parse(localStorage.getItem('user')!) || null,
  isLoading: false,
  error: false,
} as authState

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: authState, action: PayloadAction) {
      state.isLoading = false
      state.error = false
      state.user = null
      localStorage.removeItem("user")
    }
  },
  extraReducers: (builder) => {

    //googleLogin
    builder.addCase(googleLogin.pending, (state) => {
      state.isLoading = true
      state.user = null
      state.error = false
    })

    builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = false
      state.user = null
      state.user = payload
      localStorage.setItem("user", JSON.stringify(payload))
    })

    builder.addCase(googleLogin.rejected, (state) => {
      state.isLoading = false
      state.error = true
      state.user = null
    })
  },
})

export const { logout } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth
export default authSlice.reducer
