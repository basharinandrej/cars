import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {FormAddNewRequestValueTypes} from '../../interfaces/interfaces'


export interface AddNewRequestSchema {
    request: {
        description: string
    }
}

const initialState: AddNewRequestSchema = {
    request: {
        description: ''
    }
}

export const addNewRequestSlice = createSlice({
  name: 'add-new-request',
  initialState,
  reducers: {
    setRequestData: (state, action: PayloadAction<FormAddNewRequestValueTypes>) => {
      state.request = action.payload
    }
  }
})

export const {setRequestData} = addNewRequestSlice.actions
export const addNewRequestReducer = addNewRequestSlice.reducer
