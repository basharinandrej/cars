import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CarResponse, FormAddNewCarValueTypes} from '../../interfaces'
import {addNewCar} from '../async-actions/add-new-car'

export interface AddNewCarSchema {
  car: CarResponse
  error: string
}

const initialState: AddNewCarSchema = {
  car: {
    vinCode: '',
    brand: '',
    model: '',
    year: '',
    color: ''
  },
  error: ''
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
      .addCase(addNewCar.rejected, (state, payload) => {
        state.error = payload.error.message
      })
  }
})

export const {setCar} = addNewCarSlice.actions

export const addNewCarReducer = addNewCarSlice.reducer