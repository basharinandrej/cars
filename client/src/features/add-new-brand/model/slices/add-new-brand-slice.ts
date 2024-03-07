import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {addNewBrand} from '../async-actions/add-new-brand'
import {FormAddNewBrandValueTypes, Brand} from '@entities'

export interface AddNewBrandSchema {
  brand: Omit<Brand, 'id'>
  error: string
  isLoading: boolean
}

const initialState: AddNewBrandSchema = {
  brand: {
    name: ''
  },
  error: '',
  isLoading: false
}

export const addNewBrandSlice = createSlice({
  name: 'add-new-brand',
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<Partial<FormAddNewBrandValueTypes>>) => {
      state.brand = {
          ...state.brand, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewBrand.pending, (state) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(addNewBrand.fulfilled, (state) => {
        state.isLoading = false
        state.brand = {
          name: ''
        }
      })
      .addCase(addNewBrand.rejected, (state, payload) => {
        state.error = payload.error.message
        state.isLoading = false
      })
  }
})

export const {setBrand} = addNewBrandSlice.actions

export const addNewBrandReducer = addNewBrandSlice.reducer