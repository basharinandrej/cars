import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {DetailWears} from '@shared'
import {fetchListingCategories} from '../async-actions/fetch-listing-categories'
import {fetchListinModels} from '../async-actions/fetch-listing-models'


export interface Model {
  label: string
  value: number
}

export interface DetailCategory {
  label: string
  value: number
}

interface OptionWear {
  label: string, value: DetailWears
}

export interface AddNewDetailSchema {
  detailCategories: {
    items: DetailCategory[]
    total: number
  },
  models: {
    items: Model[]
    total: number
  },
  optionsWear: Array<OptionWear>,
  detail: {
    name: string | null
    vendorCode: string | null
    wear: DetailWears | null
    year: number | null
    price: number | null
    modelId: number | null
    detailCategoryId: number | null
  }
}

const initialState: AddNewDetailSchema = {
  detailCategories: {
    items: [],
    total: 0
  },
  optionsWear: [
    {label: 'Можо использовать', value: DetailWears.CanBeUsed},
    {label: 'Нужен ремонт', value: DetailWears.NeedFix},
    {label: 'Новая', value: DetailWears.New}
  ],
  models: {
    items: [],
    total: 0
  },
  detail: {
    name: null,
    vendorCode: null,
    wear: null,
    year: 2000,
    price: null,
    modelId: null,
    detailCategoryId: null
  }
}

export const addNewDetailSlice = createSlice({
  name: 'add-new-detail',
  initialState,
  reducers: {
    setDetailData: (state, action: PayloadAction<AddNewDetailSchema>) => {
      state.detail = {
        ...state.detail, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingCategories.fulfilled, (state, action: any) => {
        const data = action.payload

        state.detailCategories.items = data?.items
        state.detailCategories.total = data?.total
      })

      .addCase(fetchListinModels.fulfilled, (state, action: any) => {
        const data = action.payload

        state.models.items = data?.items
        state.models.total = data?.total
      })
  }
})

export const {setDetailData} = addNewDetailSlice.actions

export const addNewDetailReducer = addNewDetailSlice.reducer