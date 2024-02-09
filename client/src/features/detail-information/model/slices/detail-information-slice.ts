import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EMPTY_STRING } from '@shared'
import {DetailInformationResponse} from '../../interfaces'
import {fetchByIdDetail} from '../async-actions/fetch-by-id-detail'


export interface DetailInformationSchema extends DetailInformationResponse {}

const initialState: DetailInformationSchema = {
    id: null,
    vendorCode: EMPTY_STRING,
    name: '',
    wear: null,
    year: null,
    description: EMPTY_STRING,
    price: null,
    photo: EMPTY_STRING,
    user: {
        id: null,
        name: EMPTY_STRING,
        surname: EMPTY_STRING,
        phoneNumber: EMPTY_STRING
    }
}

export const detailInformationSlice = createSlice({
  name: 'detail-information',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchByIdDetail.pending, (state) => {

        })
        .addCase(fetchByIdDetail.fulfilled, (state, action: PayloadAction<DetailInformationResponse>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.vendorCode = action.payload.vendorCode
            state.wear = action.payload.wear
            state.year = action.payload.year
            state.description = action.payload.description
            state.price = action.payload.price
            state.user = action.payload.user
            state.photo = action.payload.photo
        })
  }
})

export const {} = detailInformationSlice.actions

export const detailInformationReducer = detailInformationSlice.reducer