import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'

export type AppThunk = ThunkAction<void, PhotoState, unknown, Action<string>>

export interface PhotoState {
  photos: object[]
  loading: boolean
  errors: string
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  errors: '',
}

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload
    },

    setPhotos: (state, { payload }: PayloadAction<object[]>) => {
      state.photos = payload
    },
  },
})

export const { setLoading, setErrors, setPhotos } = photosSlice.actions

export default photosSlice.reducer

// Thunk Middleware
export const getPhotos = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const baseURL: string = 'https://api.nasa.gov/planetary/apod'
      const apiKey = 'DE8fsud7knGnE2BZLsKkookQDDZlaIz9YXY6wwpO'
      const res = await axios.get(
        `${baseURL}?api_key=${apiKey}&start_date=2020-05-07&end_date=2020-05-09`,
      )
      console.log('data', res)
      dispatch(setLoading(false))
      dispatch(setPhotos(res.data))
    } catch (error) {
      console.log('fail', error)
      dispatch(setErrors(error.message))
      dispatch(setLoading(false))
    }
  }
}
