import {createSlice } from '@reduxjs/toolkit'
import {Sidebar} from '../../interfaces'

export interface SidebarSchema extends Sidebar {}

const initialState: SidebarSchema = {
  items: [
    {
        id:1,
        path: `/cabinet/profile/:id`,
        text: 'Профиль',
        iconType: 'profile'
    },
    {
        id: 2,
        path: '/cabinet/garage/:id',
        text: 'Гараж',
        iconType: 'car'
    },
    {
        id: 3,
        path: '/cabinet/:id/my-details',
        text: 'Мои объявления',
        iconType: 'list'
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