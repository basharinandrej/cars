import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {BrandResponse, ModelResponse} from '../../interfaces'
import {fetchListingBrands} from '../async-actions/fetch-listing-brands'
import {fetchListingModels} from '../async-actions/fetch-listing-models'
import { 
  EMPTY_STRING, 
  dropQuerySearch, 
  getQuerySearchFromUrl, 
  addQueryParams, 
  dropQueryModelId
} from '@shared'

interface Brand extends BrandResponse {
  selected: number
}
interface Model extends ModelResponse {
  selected: number
}
export interface FilterListingDetailsSchema {
    search: string
    brand: Brand
    model: Model
}

const initialState: FilterListingDetailsSchema = {
  search: getQuerySearchFromUrl(),
  model: {
    selected: null,
    items:[],
    total: 0
  },
  brand: {
    selected: null,
    items: [],
    total: 0
  }
}

export const filterListingDetailsSlice = createSlice({
  name: 'filter-listing-details',
  initialState,
  reducers: {
    setSearchGlobal: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    dropSearchGlobal: (state) => {
      dropQuerySearch()
      state.search = EMPTY_STRING
    },

    setSelectedBrand: (state, action: PayloadAction<number>) => {
      state.brand.selected = action.payload
    },
    dropSelectedBrand: (state) => {
      state.brand.selected = null
    },

    setSelectedModel: (state, action: PayloadAction<number>) => {
      addQueryParams({
        modelId: action.payload.toString()
      })
      state.model.selected = action.payload
    },
    dropSelectedModel: (state) => {
      dropQueryModelId()
      state.model.selected = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingBrands.pending, (state) => {
      })
      .addCase(fetchListingBrands.fulfilled, (state, action: PayloadAction<BrandResponse>) => {
        const data = action.payload

        state.brand.items = data.items
        state.brand.total = data.total
      })


      .addCase(fetchListingModels.pending, (state) => {
      })
      .addCase(fetchListingModels.fulfilled, (state, action: PayloadAction<ModelResponse>) => {
        const data = action.payload

        state.model.items = data.items
        state.model.total = data.total
      })
  }
})

export const {
  setSearchGlobal, 
  dropSearchGlobal,

  setSelectedBrand,
  dropSelectedBrand,
  
  setSelectedModel,
  dropSelectedModel
} = filterListingDetailsSlice.actions

export const filterListingDetailsReducer = filterListingDetailsSlice.reducer