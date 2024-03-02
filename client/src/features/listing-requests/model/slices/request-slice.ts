import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchRequests } from '../async-actions/fetch-requests'
import { IRequest, RequestsResponse } from '@entities'


export interface RequestsSchema {
    requests: IRequest[]
    count: number
}

const initialState: RequestsSchema = {
    requests: [],
    count: 0
}

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchRequests.fulfilled, (state, action: PayloadAction<RequestsResponse>) => {
            state.requests = action.payload.rows
            state.count = action.payload.count
        })
  }
})

export const requestReducer = requestSlice.reducer
