import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { RootState } from '../../app/store'
import { fetchCountries } from './fetchCountries'
import { CountryTypes } from './types'

export interface CountriesState {
  countries: CountryTypes[]
  isLoading: boolean
  error: boolean
}

const initialState = {
  countries: [],
  isLoading: false,
  error: false,
} as CountriesState

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    taggleVisit: (state, { payload }: PayloadAction<string>) => {
      state.countries?.map((c: CountryTypes) => {
        if (c?.name?.official === payload) {
          c.visited = !c.visited
        }
        return c
      })
    },

    taggleFevoutite: (state, { payload }: PayloadAction<string>) => {
      state.countries?.map((c) => {
        if (c?.name?.official === payload) {
          c.fevourite = !c.fevourite
        }
        return c
      })
    },

    sortBy: (state, { payload }: PayloadAction<string>) => {

      if (payload === "name") {
        state.countries = _.sortBy(state.countries, (c) => c?.name?.official)
      }
      else if (payload === "region") {
        state.countries = _.sortBy(state.countries, (c) => c?.region)
      }
      else if (payload === "capital") {
        state.countries = _.sortBy(state.countries, (c) => c?.capital)

      }
      else if (payload === "population") {
        state.countries = _.sortBy(state.countries, (c) => c?.population)
      }
      else if (payload === "visited") {
        state.countries = _.sortBy(state.countries, (c) => !c?.visited)
      }
      else if (payload === "fevourite") {
        state.countries = _.sortBy(state.countries, (c) => !c?.fevourite)
      }
    },

    SearchCountry: (state, { payload }) => {
      state.countries = state.countries?.filter(
        (c) =>
          c?.name?.common?.toLowerCase().includes(payload) ||
          c?.name?.official.toLowerCase()?.includes(payload)
      )
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
      state.countries = payload
      state.isLoading = false
      window.localStorage.setItem("countries", JSON.stringify(payload))
    })

    builder.addCase(fetchCountries.rejected, (state) => {
      state.isLoading = false
      state.error = true
    })
  },
})

export const { taggleVisit, taggleFevoutite, sortBy, SearchCountry } =
  countriesSlice.actions
export const selectCountries = (state: RootState) => state.countries
export default countriesSlice.reducer
