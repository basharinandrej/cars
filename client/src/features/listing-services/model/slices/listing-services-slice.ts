import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchServices } from '../async-actions/fetch-services'
import { IService, ServicesResponse } from '@entities'

export interface ServiceSchema {
    services: IService[]
    selectedServiceForUpdate: IService
    count: number
}

const initialState: ServiceSchema = {
    services: [],
    selectedServiceForUpdate: null,
    count: 0
}

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    selectedServiceForUpdate: (state, action: PayloadAction<number>) => {
        state.selectedServiceForUpdate = state.services.find((item) => item.id === action.payload)
    },
    updateSelectedService: (state, action: PayloadAction<Partial<unknown>>) => {
      state.selectedServiceForUpdate = {
          ...state.selectedServiceForUpdate, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchServices.fulfilled, (state, action: PayloadAction<ServicesResponse>) => {
            state.services = action.payload.rows
            state.count = action.payload.count
        })
  }
})


export const { selectedServiceForUpdate, updateSelectedService } = servicesSlice.actions
export const servicesReducer = servicesSlice.reducer
