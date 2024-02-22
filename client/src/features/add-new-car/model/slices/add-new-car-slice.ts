import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {CarResponse} from '../../interfaces'


export interface AddNewCarSchema {
  car: CarResponse
}

const initialState: AddNewCarSchema = {
  car: {
    vinCode: '',
    brand: '',
    model: '',
    year: '',
    color: ''
  }
}

export const addNewCarSlice = createSlice({
  name: 'add-new-car',
  initialState,
  reducers: {
    setCar: (state, action: PayloadAction<Partial<CarResponse>>) => {
        state.car = {
            ...state.car, ...action.payload
        }
    }
  },
})

export const {setCar} = addNewCarSlice.actions

export const addNewCarReducer = addNewCarSlice.reducer