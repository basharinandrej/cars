import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {addNewCar} from '../async-actions/add-new-car'
import {FormAddNewCarValueTypes, Car} from '@entities'

export interface AddNewCarSchema {
  car: Omit<Car, 'userId'>
  error: string
  isLoading: boolean
}

const initialState: AddNewCarSchema = {
  car: {
    vinCode: '',
    brand: '',
    model: '',
    year: '',
    color: ''
  },
  error: '',
  isLoading: false
}

export const addNewCarSlice = createSlice({
  name: 'add-new-car',
  initialState,
  reducers: {
    setCar: (state, action: PayloadAction<Partial<FormAddNewCarValueTypes>>) => {
      state.car = {
          ...state.car, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCar.pending, (state) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(addNewCar.fulfilled, (state) => {
        state.isLoading = false
        state.car = {
          vinCode: '',
          brand: '',
          model: '',
          year: '',
          color: ''
        }
      })
      .addCase(addNewCar.rejected, (state, payload) => {
        state.error = payload.error.message
        state.isLoading = false
      })
  }
})

export const {setCar} = addNewCarSlice.actions

export const addNewCarReducer = addNewCarSlice.reducer