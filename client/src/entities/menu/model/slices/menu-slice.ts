import { createSlice } from '@reduxjs/toolkit'
import {Menu} from '../../interfaces'


export interface MenuSchema extends Menu {}

const initialState: MenuSchema = {
  items: [
    {
        path: '/',
        text: 'Каталог деталей'
    },
    {
        path: '/organizations',
        text: 'Каталог автосервисов'
    }
  ]
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {}
})


export const menuSliceReducer = menuSlice.reducer