import {RootState} from '@app'
import {createSelector} from "@reduxjs/toolkit";

export const getDataUser = (state: RootState) => state.profile.user
export const getDataUserForUpdate = createSelector(
    getDataUser,
    (user) => {
        return {
            id: user.id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            surname: user.surname,
            email: user.email,
            role: user.role
        }
    }
)

export const getDataOrganization = (state: RootState) => state.profile.organization

export const getIsEditing = (state: RootState) => state.profile.isEditing
export const getUserRole = ({profile}: RootState) => profile.user.role
export const getUserId = ({profile}: RootState) => profile.user.id
export const getOrganizationId = ({profile}: RootState) => profile.organization.id