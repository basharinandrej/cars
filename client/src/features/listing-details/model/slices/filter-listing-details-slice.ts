import { createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'
import type { PayloadAction } from '@reduxjs/toolkit'
import {BrandResponse, ModelResponse, BrandByIdResponse, CategoryResponse} from '../../interfaces'


import {fetchListingCategories} from '../async-actions/fetch-listing-categories'
import {fetchListingBrands} from '../async-actions/fetch-listing-brands'
import {fetchListingModels} from '../async-actions/fetch-listing-models'
import {fetchByIdBrand} from '../async-actions/fetch-by-id-brand'


import { 
  EMPTY_STRING, 
  ParsedUrl,
  deleteOneQueryParam,
  addQueryParams,
  deleteAllQueryParams,
} from '@shared'

interface BrandState extends BrandResponse {
  selected: {
    label?: string,
    value: number
  }
}

interface ModelState extends ModelResponse {
  selected: {
    label?: string,
    value: number
  }
}

interface CategoryState extends CategoryResponse {
  selected: {
    label?: string,
    value: number
  }
}

export interface FilterListingDetailsSchema {
  searchGlobal: string
  brand: BrandState
  model: ModelState
  category: CategoryState
}

const initialState: FilterListingDetailsSchema = {
  searchGlobal: EMPTY_STRING,
  category: {
    selected: null,
    count: 0,
    rows: []
  },
  model: {
    selected: null,
    rows:[],
    count: 0
  },
  brand: {
    selected: null,
    rows: [],
    count: 0
  }
}

export const filterListingDetailsSlice = createSlice({
  name: 'filter-listing-details',
  initialState,
  reducers: {
    initFilters: (state) => {
      const parsedUrl: ParsedUrl = queryString.parse(location.search);

      if(Number(parsedUrl.keyword)) {
        state.searchGlobal = parsedUrl.keyword
      }

      if(Number(parsedUrl.modelId)) {
        state.model.selected = {
          ...state.model.selected,
          value: Number(parsedUrl.modelId)
        }
      }

      if(Number(parsedUrl.brandId)) {
        state.brand.selected = {
          ...state.brand.selected,
          value: Number(parsedUrl.brandId)
        }
      }

      if(Number(parsedUrl.detailCategoryId)) {
        state.category.selected = {
          ...state.category.selected,
          value: Number(parsedUrl.detailCategoryId)
        }
      }
    },
    dropFilters: (state) => {
      deleteAllQueryParams()
      state.searchGlobal = EMPTY_STRING
      state.category = {
        selected: null,
        count: 0,
        rows: []
      }
      state.model = {
        selected: null,
        rows:[],
        count: 0
      }
      state.brand =  {
        selected: null,
        rows: [],
        count: 0
      }
    },


    setSearchGlobal: (state, action: PayloadAction<string>) => {
      state.searchGlobal = action.payload
    },
    dropSearchGlobal: (state) => {
      deleteOneQueryParam('keyword')
      state.searchGlobal = EMPTY_STRING
    },

    setSelectedBrand: (state, action: PayloadAction<number>) => {
      addQueryParams('brandId', action.payload)
      state.brand.selected = state.brand.rows.find((brandItem) => brandItem.value === action.payload)
    },
    dropSelectedBrand: (state) => {
      deleteOneQueryParam('brandId')
      state.brand.selected = null
    },

    setSelectedModel: (state, action: PayloadAction<number>) => {
      addQueryParams('modelId', action.payload)
      state.model.selected = state.model.rows.find((modelItem) => modelItem.value === action.payload)
    },
    dropSelectedModel: (state) => {
      deleteOneQueryParam('modelId')
      state.model.selected = null
    },

    setSelectedCategory: (state, action: PayloadAction<number>) => {
      addQueryParams('detailCategoryId', action.payload)
      state.category.selected = state.category.rows.find((categoryDetailItem) => categoryDetailItem.value === action.payload)
    },
    dropSelectedCategory: (state) => {
      deleteOneQueryParam('detailCategoryId')
      state.category.selected = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingBrands.pending, (state) => {})
      .addCase(fetchListingBrands.fulfilled, (state, action: PayloadAction<BrandResponse>) => {
        const data = action.payload

        state.brand.rows = data?.rows
        state.brand.count = data?.count
      })


      .addCase(fetchListingModels.pending, (state) => {})
      .addCase(fetchListingModels.fulfilled, (state, action: PayloadAction<ModelResponse>) => {
        const data = action.payload

        state.model.rows = data?.rows
        state.model.count = data?.count
      })


      .addCase(fetchByIdBrand.pending, () => {})
      .addCase(fetchByIdBrand.fulfilled, (state, action: PayloadAction<BrandByIdResponse>) => {
        const modelId = state.model.selected?.value
        const selectedModel = action.payload.models.find((model) => model.id === modelId)

        state.brand.selected = {
          value: state.brand.selected?.value,
          label: action.payload.name
        }
        state.model.selected.label = selectedModel?.name
        state.model.selected.value = selectedModel?.id
      })


      .addCase(fetchListingCategories.pending, (state) => {})
      .addCase(fetchListingCategories.fulfilled, (state, action: PayloadAction<CategoryResponse>) => {
        const data = action.payload

        state.category.rows = data?.rows
        state.category.count = data?.count

        if(state.category.selected?.value && !state.category.selected?.label) {
          const selectedCategory = data.rows.find((category) => category.value === state.category.selected.value)

          state.category.selected.label = selectedCategory.label
          state.category.selected.value = selectedCategory.value
        }
      })

  }
})

export const {
  initFilters,
  dropFilters,
  
  setSearchGlobal, 
  dropSearchGlobal,

  setSelectedBrand,
  dropSelectedBrand,
  
  setSelectedModel,
  dropSelectedModel,

  setSelectedCategory,
  dropSelectedCategory
} = filterListingDetailsSlice.actions

export const filterListingDetailsReducer = filterListingDetailsSlice.reducer