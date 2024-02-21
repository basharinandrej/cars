import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CarResponse} from '../../interfaces'
import {fetchCarUser} from '../../../garage/model/async-actions/fetch-cars-user'

export interface CarSchema extends CarResponse{
}

const initialState: CarSchema = {
    total: null,
    items: []
}

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCarUser.fulfilled, (state, action: PayloadAction<CarResponse>) => {
        state.items = action.payload.items
        state.total = action.payload.total
      })
  }
})


export const carsReduces = carsSlice.reducer