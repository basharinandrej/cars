import {RootState} from '@app'
import {createSelector} from "@reduxjs/toolkit";



export const getItems = (state: RootState) => state.sidebar.items
export const getUserId = (state: RootState) => state.profile.user.id

export const getSidebarItems = createSelector(
    getUserId,
    getItems,
    (userId, sidebarItems) => {
        return sidebarItems.map((sidebarItem) => {
            const preparePath = sidebarItem.path.replace(':id', userId?.toString())

            return {
                key: sidebarItem.id,
                path: preparePath,
                text: sidebarItem.text
            }
        })
    }
)