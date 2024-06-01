import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {BrandsResponse, Model, ModelResponse} from '../../interfaces'
import { fetchModels } from '../async-action/fetch-models'
import { fetchListinBrands } from '../async-action/fetch-listing-brands';

export interface ModelSchema extends ModelResponse {
  selectedModelForUpdate: Model
  brands: BrandsResponse
}

const initialState: ModelSchema = {
    count: null,
    rows: [],
    selectedModelForUpdate: null,
    brands: {
      rows: [],
      count: 0
    },
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    selectedModelForUpdate: (state, action: PayloadAction<number>) => {
      state.selectedModelForUpdate = state.rows.find((item) => item.id === action.payload)
    },
    updateSelectedModel: (state, action: PayloadAction<Partial<unknown>>) => {
      state.selectedModelForUpdate = {
          ...state.selectedModelForUpdate, ...action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchModels.fulfilled, (state, action: PayloadAction<ModelResponse>) => {
        state.rows = action.payload?.rows
        state.count = action.payload?.count
      })

      .addCase(fetchListinBrands.fulfilled, (state, action: PayloadAction<BrandsResponse>) => {
        const data = action.payload

        state.brands.rows = data?.rows
        state.brands.count = data?.count
      })
  }
})

export const {selectedModelForUpdate, updateSelectedModel} = modelSlice.actions
export const modelReducer = modelSlice.reducer