import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Bans } from '@shared'
import {OrganizationInformationResponse} from '../../interfaces'
import {fetchByIdOrganization} from '../async-actions/fetch-by-id-organization'


export interface OrganizationInformationSchema extends OrganizationInformationResponse {}

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
            state.services = action.payload.services
        })
  }
})

export const {} = organizationInformationSlice.actions

export const organizationInformationReducer = organizationInformationSlice.reducer