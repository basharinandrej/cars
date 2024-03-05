import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {addNewCategoryDetail} from '../async-actions/add-new-category-detail'
import {FormAddNewCategoryDetailValueTypes, CategoryDetail} from '@entities'

export interface AddNewCategoryDetailSchema {
  categoryDetail: Omit<CategoryDetail, 'id'>
  error: string
  isLoading: boolean
}

const initialState: AddNewCategoryDetailSchema = {
  categoryDetail: {
    name: ''
  },
  error: '',
  isLoading: false
}

export const addNewCategoryDetailSlice = createSlice({
  name: 'add-new-category-detail',
  initialState,
  reducers: {
    setCategoryDetail: (state, action: PayloadAction<Partial<FormAddNewCategoryDetailValueTypes>>) => {
      state.categoryDetail = {
          ...state.categoryDetail, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCategoryDetail.pending, (state) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(addNewCategoryDetail.fulfilled, (state) => {
        state.isLoading = false
        state.categoryDetail = {
          name: ''
        }
      })
      .addCase(addNewCategoryDetail.rejected, (state, payload) => {
        state.error = payload.error.message
        state.isLoading = false
      })
  }
})

export const {setCategoryDetail} = addNewCategoryDetailSlice.actions

export const addNewCategoryDetailReducer = addNewCategoryDetailSlice.reducer