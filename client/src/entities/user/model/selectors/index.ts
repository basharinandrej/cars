import {RootState} from '@app'

export const getUsers = (state: RootState) => state.users.items
