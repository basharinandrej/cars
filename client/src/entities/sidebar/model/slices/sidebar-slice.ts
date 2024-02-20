import {createSlice } from '@reduxjs/toolkit'
import {Sidebar} from '../../interfaces'


export interface SidebarSchema extends Sidebar {}

const initialState: SidebarSchema = {
  items: [
    {
        id:1,
        path: `/cabinet/:id`,
        text: 'Профиль'
    },
    {
        id: 2,
        path: '/cabinet/:id/garage',
        text: 'Гараж'
    },
    {
        id: 3,
        path: '/cabinet/:id/my-details',
        text: 'Мои объявления'
    }
  ]
}

export const sidebarSlice = createSlice({
  name: 'sibebar',
  initialState,
  reducers: {

  }
})

export const sidebarSliceReducer = sidebarSlice.reducer