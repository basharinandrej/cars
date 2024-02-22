import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CarResponse} from '../../interfaces'
import {fetchCarUser} from '../async-actions/fetch-cars-user'
import {deleteCarUser} from '../async-actions/delete-car-user'
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
      .addCase(deleteCarUser.fulfilled, (state, action: PayloadAction<string|null>) => {
        state.items = state.items.filter((item) => item.vinCode !== action.payload)
        state.total = state.items.filter((item) => item.vinCode !== action.payload).length
      })
  }
})


export const carsReduces = carsSlice.reducer