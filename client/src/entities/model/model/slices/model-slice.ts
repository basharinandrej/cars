import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {Brand, BrandsResponse, Model, ModelResponse} from '../../interfaces'
import { fetchModels } from '../async-action/fetch-models'
import { fetchListinBrands } from '../async-action/fetch-listing-brands';

interface SelectedModelForUpdate extends Model {
  brand: Brand
}

export interface ModelSchema extends ModelResponse {
  selectedModelForUpdate: SelectedModelForUpdate
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
      state.selectedModelForUpdate = {
        ...state.rows.find((item) => item.id === action.payload),
      }
    },
    updateSelectedModelName: (state, action: PayloadAction<Partial<string>>) => {
      const updatedState = {
        ...state.selectedModelForUpdate,
        name: action.payload
      }
      state.selectedModelForUpdate = updatedState
    },
    updateSelectedBrandOfModel: (state, action: PayloadAction<Partial<number>>) => {
      const updatedState = {
        ...state.selectedModelForUpdate,
        brand: state.brands.rows.find((brand) => brand.value === action.payload)
      }
      state.selectedModelForUpdate = updatedState
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

export const {selectedModelForUpdate, updateSelectedBrandOfModel, updateSelectedModelName} = modelSlice.actions
export const modelReducer = modelSlice.reducer