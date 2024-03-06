import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {addNewCategoryService} from '../async-actions/add-new-category-service'
import {FormAddNewCategoryServiceValueTypes, CategoryService} from '@entities'

export interface AddNewCategoryServiceSchema {
  categoryService: Omit<CategoryService, 'id'>
  error: string
  isLoading: boolean
}

const initialState: AddNewCategoryServiceSchema = {
  categoryService: {
    name: ''
  },
  error: '',
  isLoading: false
}

export const addNewCategoryServiceSlice = createSlice({
  name: 'add-new-category-service',
  initialState,
  reducers: {
    setCategoryService: (state, action: PayloadAction<Partial<FormAddNewCategoryServiceValueTypes>>) => {
      state.categoryService = {
          ...state.categoryService, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCategoryService.pending, (state) => {
        state.error = ''
        state.isLoading = true
      })
      .addCase(addNewCategoryService.fulfilled, (state) => {
        state.isLoading = false
        state.categoryService = {
          name: ''
        }
      })
      .addCase(addNewCategoryService.rejected, (state, payload) => {
        state.error = payload.error.message
        state.isLoading = false
      })
  }
})

export const {setCategoryService} = addNewCategoryServiceSlice.actions

export const addNewCategoryServiceReducer = addNewCategoryServiceSlice.reducer