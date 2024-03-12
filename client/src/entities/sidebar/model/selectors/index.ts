import {RootState} from '@app'
import {createSelector} from "@reduxjs/toolkit";



export const getItems = (state: RootState) => state.sidebar.items
export const getUserId = (state: RootState) => state.profile.user.id
export const getOrganizationId = (state: RootState) => state.profile.organization.id
export const getUserRole = (state: RootState) => state.profile.user.role

export const getSidebarItems = createSelector(
    getUserId,
    getOrganizationId,
    getItems,
    (userId, organizationId, sidebarItems) => {
        return sidebarItems.map((sidebarItem) => {
            const id = userId || organizationId
            const preparePath = sidebarItem.path.replace(':id', id?.toString())

            return {
                key: sidebarItem.id,
                path: preparePath,
                text: sidebarItem.text,
                iconType: sidebarItem.iconType,
                permissionForUserRole: sidebarItem.permissionForUserRole,
                onlyOrganization: sidebarItem.onlyOrganization
            }
        })
    }
)

export const getCurrentSidebarItem = (state: RootState) => state.sidebar.currentItem