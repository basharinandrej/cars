import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {addNewModel} from '../async-actions/add-new-model'
import {FormAddNewModelValueTypes, Model} from '@entities'

export interface AddNewModelSchema {
  model: Omit<Model, 'id'>
  error: string
  isLoading: boolean
}

const initialState: AddNewModelSchema = {
  model: {
    name: ''
  },
  error: '',
  isLoading: false
}

export const addNewModelSlice = createSlice({
  name: 'add-new-model',
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<Partial<FormAddNewModelValueTypes>>) => {
      state.model = {
          ...state.model, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewModel.pending, (state) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(addNewModel.fulfilled, (state) => {
        state.isLoading = false
        state.model = {
          name: ''
        }
      })
      .addCase(addNewModel.rejected, (state, payload) => {
        state.error = payload.error.message
        state.isLoading = false
      })
  }
})

export const {setModel} = addNewModelSlice.actions

export const addNewModelReducer = addNewModelSlice.reducer