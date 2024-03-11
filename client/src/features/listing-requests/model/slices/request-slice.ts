import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchRequests } from '../async-actions/fetch-requests'
import { IRequest, RequestsResponse } from '@entities'
import {FormUpdateRequestValueTypes} from '../../interfaces'

export interface RequestsSchema {
    requests: IRequest[]
    selectedRequestForUpdate: IRequest
    count: number
}

const initialState: RequestsSchema = {
    requests: [],
    selectedRequestForUpdate: null,
    count: 0
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    selectedRequestForUpdate: (state, action: PayloadAction<number>) => {
        state.selectedRequestForUpdate = state.requests.find((item) => item.id === action.payload)
    },
    updateSelectedRequest: (state, action: PayloadAction<Partial<FormUpdateRequestValueTypes>>) => {
      state.selectedRequestForUpdate = {
          ...state.selectedRequestForUpdate, ...action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchRequests.fulfilled, (state, action: PayloadAction<RequestsResponse>) => {
            state.requests = action.payload.rows
            state.count = action.payload.count
        })
  }
})


export const { selectedRequestForUpdate, updateSelectedRequest } = requestSlice.actions
export const requestReducer = requestSlice.reducer
