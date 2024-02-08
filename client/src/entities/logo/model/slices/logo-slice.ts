import { createSlice } from '@reduxjs/toolkit'


export interface LogoSchema {
    text: string,
    path: string
}

const initialState: LogoSchema = {
    text: 'Пипелац 35',
    path: '/'
}

export const logoSlice = createSlice({
  name: 'logo',
  initialState,
  reducers: {}
})


export const logoSliceReducer = logoSlice.reducer