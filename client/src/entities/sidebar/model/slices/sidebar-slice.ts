import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import {Sidebar} from '../../interfaces'
import { UserRoles } from '@shared'

export interface SidebarSchema extends Sidebar {
  currentItem: number
}

const initialState: SidebarSchema = {
  currentItem: 1,
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
        iconType: 'car',
        permissionForUserRole: [UserRoles.Admin, UserRoles.Moderator, UserRoles.Person]
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
        permissionForUserRole: [UserRoles.Admin]
    },
    {
        id: 5,
        path: '/cabinet/category-details',
        text: 'Категории деталей',
        iconType: 'category-detail',
        permissionForUserRole: [UserRoles.Admin]
    },
    {
      id: 9,
      path: '/cabinet/category-services',
      text: 'Категории услуг',
      iconType: 'category-services',
      permissionForUserRole: [UserRoles.Admin]
    },
    {
        id: 6,
        path: '/cabinet/brands',
        text: 'Бренды',
        iconType: 'brands',
        permissionForUserRole: [UserRoles.Admin]
    },
    {
        id: 7,
        path: '/cabinet/models',
        text: 'Модели',
        iconType: 'models',
        permissionForUserRole: [UserRoles.Admin]
    },
    {
        id: 8,
        path: '/cabinet/my-request/:id',
        text: 'Мои заявки',
        iconType: 'my-request'
    },
    {
        id: 10,
        path: '/cabinet/my-services/:id',
        text: 'Мои услуги',
        iconType: 'my-services',
        onlyOrganization: true
    }
  ]
}

export const sidebarSlice = createSlice({
  name: 'sibebar',
  initialState,
  reducers: {
    initCurrentSidebarItem: (state,  action: PayloadAction<{pathname: string}>) => {
      state.currentItem = state.items.find((item) => {
        return item.path.includes(action.payload.pathname.slice(0, action.payload.pathname.length-2))
      })?.id
    },
    setCurrentSidebarItem: (state, action: PayloadAction<number>) => {
      state.currentItem = action.payload
    }
  }
})

export const {initCurrentSidebarItem, setCurrentSidebarItem} = sidebarSlice.actions

export const sidebarSliceReducer = sidebarSlice.reducer