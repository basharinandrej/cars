import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {UsersResponse} from '../../interfaces/interfaces'
import { featchUsers } from '../async-actions/fetch-users'


export interface UsersSchema extends UsersResponse {
}

const initialState: UsersSchema = {
    items: [],
    total: 0
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(featchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
            state.items = action.payload.items
            state.total = action.payload.total
        })
  }
})

export const {} = usersSlice.actions

export const usersReducers = usersSlice.reducer