import { RootState } from "@app";


export const getRegistrationOrganization = (state: RootState) => state.registrationOrganization
export const getAvatarOrganization = (state: RootState) => state.registrationOrganization?.avatar