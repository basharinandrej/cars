import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bans } from '@shared'
import {OrganizationInformationResponse} from '../../interfaces'
import {fetchByIdOrganization} from '../async-actions/fetch-by-id-organization'
import { IService } from '@entities'


export interface OrganizationInformationSchema extends Omit<OrganizationInformationResponse, 'serviceCategories'> {
  services: {
    id: number,
    name: string,
    description: string,
    price: number,
    organizationId: number,
    serviceCategoryId: number
    nameCategory: string
  }[]
}

const initialState: OrganizationInformationSchema = {
    id: null,
    name: '',
    phoneNumber: '',
    avatar: '',
    ban: Bans.Null,
    status: null,
    addresses: [],
    services: []
}

export const organizationInformationSlice = createSlice({
  name: 'organization-information',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchByIdOrganization.pending, () => {

        })
        .addCase(fetchByIdOrganization.fulfilled, (state, action: PayloadAction<OrganizationInformationResponse>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.phoneNumber = action.payload.phoneNumber
            state.status = action.payload.status
            state.ban = action.payload.ban
            state.avatar = action.payload.avatar

            state.addresses = action.payload.addresses
            state.services = action.payload.serviceCategories.map((serviceCategory) => {
              return {
                id: serviceCategory.OrganizationServiceCategory.id,
                name: serviceCategory.OrganizationServiceCategory.name,
                nameCategory: serviceCategory.name,
                price: serviceCategory.OrganizationServiceCategory.price,
                description: serviceCategory.OrganizationServiceCategory.description,
                serviceCategoryId: serviceCategory.OrganizationServiceCategory.serviceCategoryId,
                organizationId: serviceCategory.OrganizationServiceCategory.organizationId
              }
            })
        })
  }
})

export const {} = organizationInformationSlice.actions

export const organizationInformationReducer = organizationInformationSlice.reducer