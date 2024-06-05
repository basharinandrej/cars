import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'

export const setBanOrganization = createAsyncThunk<void, number, ThunkApiConfig>(
    'set-ban-organization/setBanOrganization',
    async (organizationId, thunkAPI) => {
        try {
            const { extra} = thunkAPI
      
            const response = await extra.api.patch('/api/organization', {
                id:organizationId,
                ban: "Temporary"
            })

            extra.notificationApi.success({
                message: `Организация успешно забанена`,
            })
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении бана организации',
                description: errorMessage
            })
            throw errorMessage     
        }
    }
)