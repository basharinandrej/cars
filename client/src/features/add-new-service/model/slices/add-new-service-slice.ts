import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {FormAddNewServiceValueTypes, ServiceCategoryResponse, IServiceRequest} from '@entities'
import { fetchListingServiceCategories } from '../async-actions/fetch-service-categories'

export interface AddNewServiceSchema {
  service: IServiceRequest
  error: string
  isLoading: boolean
  serviceCategories: ServiceCategoryResponse
}

const initialState: AddNewServiceSchema = {
    service: {
        name: null,
        description: null,
        price: null,
        organizationId: null,
        serviceCategoryId: null,
        serviceCategory: {id: null, name: null},
    },
    serviceCategories: {
        items: [],
        total: null
    },
    error: '',
    isLoading: false
}

export const addNewServiceSlice = createSlice({
  name: 'add-new-service',
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<Partial<FormAddNewServiceValueTypes>>) => {
      state.service = {
          ...state.service, ...action.payload
      }
    },
    dropServiceData: (state) => {
      state.service = {
          name: '',
          description: '',
          price: null,
          organizationId: null,
          serviceCategoryId: null,
          serviceCategory: {id: null, name: null},
      }
    },
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(addNewCar.pending, (state) => {
    //     state.error = ''
    //     state.isLoading = true
    //   })
    //   .addCase(addNewCar.fulfilled, (state) => {
    //     state.isLoading = false
    //     state.service = {
    //       name: '',
    //       description: '',
    //       price: null,
    //       organizationId: null,
    //       serviceCategoryId: null
    //     }
    //   })
    //   .addCase(addNewCar.rejected, (state, payload) => {
    //     state.error = payload.error.message
    //     state.isLoading = false
    //   })

      .addCase(fetchListingServiceCategories.fulfilled, (state, action: PayloadAction<ServiceCategoryResponse>) => {
        state.serviceCategories.items = action.payload?.items
        state.serviceCategories.total = action.payload?.total
      })
  }
})

export const {setService, dropServiceData} = addNewServiceSlice.actions

export const addNewServiceReducer = addNewServiceSlice.reducer