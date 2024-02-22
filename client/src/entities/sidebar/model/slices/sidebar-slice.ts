import {createSlice } from '@reduxjs/toolkit'
import {Sidebar} from '../../interfaces'
import { UserRoles } from '@shared'

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
        path: '/cabinet/my-details/:id',
        text: 'Мои объявления',
        iconType: 'list'
    },
    {
        id: 4,
        path: '/cabinet/users',
        text: 'Пользователи',
        iconType: 'users',
        userRole: UserRoles.Admin
    },
    {
        id: 5,
        path: '/cabinet/category-details',
        text: 'Категории деталей',
        iconType: 'category-detail',
        userRole: UserRoles.Admin
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