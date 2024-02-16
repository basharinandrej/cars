import { createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'
import type { PayloadAction } from '@reduxjs/toolkit'
import {StatusOrganization, addQueryParams} from '@shared'
import { DefaultOptionType } from 'antd/es/select';
import {fetchListingServiceCategories} from '../async-actions/fetch-listing-service-categories'
import {ServiceCategoryResponse} from '../../interfaces'

import { 
  ParsedUrl,
  deleteOneQueryParam
} from '@shared'


interface ServiceCategoryState extends ServiceCategoryResponse {
  selected: {
    label?: string,
    value: number
  }
}
export interface FilterListingOrganizationsSchema {
  status: StatusOrganization | null
  optionsStatusOrganization: DefaultOptionType[]
  serviceCategories: null | ServiceCategoryState
}

const initialState: FilterListingOrganizationsSchema = {
    status: null,
    serviceCategories: {
      items: [],
      total: 0,
      selected: null
    },
    optionsStatusOrganization: [
        {
            label: 'Занят',
            value: StatusOrganization.Busy
        },
        {
            label: 'Рассматривает заявки',
            value: StatusOrganization.Waiting
        },
        {
            label: 'Свободен',
            value: StatusOrganization.Free
        }
    ]
}

export const filterListingOrganizationsSlice = createSlice({
  name: 'filter-listing-organizations',
  initialState,
  reducers: {
    initFilters: (state) => {
      const parsedUrl: ParsedUrl = queryString.parse(location.search);

      if(Number(parsedUrl.statusOrganization)) {
        state.status = parsedUrl.statusOrganization as StatusOrganization
      }

      if(Number(parsedUrl.serviceCategoryId)) {
        state.serviceCategories.selected = {
          ...state.serviceCategories.selected,
          value: Number(parsedUrl.serviceCategoryId)
        }
      }
    },
    dropFilters: (state) => {
      state.status = null,
      state.serviceCategories = {
        selected: null,
        total: 0,
        items: []
      }
    },

    setSelectedServiceCategory: (state, action: PayloadAction<number>) => {
      addQueryParams('serviceCategoryId', action.payload)
      state.serviceCategories.selected = state.serviceCategories.items.find((categoryServiceItem) => categoryServiceItem.value === action.payload)
    },
    dropSelectedServiceCategory: (state) => {
      deleteOneQueryParam('serviceCategoryId')
      state.serviceCategories.selected = null
    },

    setStatusOrganization: (state, action: PayloadAction<StatusOrganization>) => {
      state.status = action.payload
    },
    dropStatusOrganization: (state) => {
      deleteOneQueryParam('statusOrganization')
      state.status = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingServiceCategories.pending, () => {})
      .addCase(fetchListingServiceCategories.fulfilled, (state, action: PayloadAction<ServiceCategoryResponse>) => {
        const data = action.payload
  
        state.serviceCategories.items = data?.items
        state.serviceCategories.total = data?.total
      })
  }
})

export const {
  initFilters,
  dropFilters,
  
  setStatusOrganization, 
  dropStatusOrganization,

  setSelectedServiceCategory,
  dropSelectedServiceCategory
} = filterListingOrganizationsSlice.actions

export const filterListingOrganizationsReducer = filterListingOrganizationsSlice.reducer