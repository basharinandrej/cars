import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {Model, ModelResponse} from '../../interfaces'
import { fetchModels } from '../async-action/fetch-models'

export interface ModelSchema extends ModelResponse {
  selectedModelForUpdate: Model
}

const initialState: ModelSchema = {
    count: null,
    rows: [],
    selectedModelForUpdate: null
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
  }
})

export const {selectedModelForUpdate, updateSelectedModel} = modelSlice.actions
export const modelReducer = modelSlice.reducer