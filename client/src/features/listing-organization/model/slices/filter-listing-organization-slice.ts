import { createSlice } from '@reduxjs/toolkit'
import queryString from 'query-string'
import type { PayloadAction } from '@reduxjs/toolkit'
import {StatusOrganization} from '@shared'
import { DefaultOptionType } from 'antd/es/select';


import { 
  ParsedUrl,
  deleteOneQueryParam
} from '@shared'


export interface FilterListingOrganizationsSchema {
  status: StatusOrganization | null
  optionsStatusOrganization: DefaultOptionType[]
}

const initialState: FilterListingOrganizationsSchema = {
    status: null,
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
    },
    dropFilters: (state) => {
      state.status = null
    },


    setStatusOrganization: (state, action: PayloadAction<StatusOrganization>) => {
      state.status = action.payload
    },
    dropStatusOrganization: (state) => {
      deleteOneQueryParam('statusOrganization')
      state.status = null
    },

  },
})

export const {
  initFilters,
  dropFilters,
  
  setStatusOrganization, 
  dropStatusOrganization
} = filterListingOrganizationsSlice.actions

export const filterListingOrganizationsReducer = filterListingOrganizationsSlice.reducer