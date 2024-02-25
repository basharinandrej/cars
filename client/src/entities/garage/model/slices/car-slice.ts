import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CarResponse, Car} from '../../interfaces'
import {fetchCarUser} from '../async-actions/fetch-cars-user'
import {deleteCarUser} from '../async-actions/delete-car-user'


export interface CarSchema extends CarResponse {
  selectedCarForUpdate: Car
}

const initialState: CarSchema = {
    total: null,
    items: [],
    selectedCarForUpdate: null
}

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    selectedCarForUpdate: (state, action: PayloadAction<string>) => {
      state.selectedCarForUpdate = state.items.find((item) => item.vinCode === action.payload)
    }
  },
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

export const {selectedCarForUpdate} = carsSlice.actions
export const carsReduces = carsSlice.reducer