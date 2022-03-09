import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { USerType } from "../../types/userTypes";

const API_URL = '/api/v1/users/google-login'

export const googleLogin = createAsyncThunk('auth/google-login', async (token) => {
    const response = await axios.post(API_URL, token)
    const result: USerType = response.data
    return result
})
