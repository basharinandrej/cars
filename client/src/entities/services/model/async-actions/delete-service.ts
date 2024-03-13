import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchServices} from '../../../../features/listing-services/model/async-actions/fetch-services'
import {getIdOrganization} from '../../../../features/listing-services/model/selectors'

export const deleteService = createAsyncThunk<string, number, ThunkApiConfig>(
    'delete-car-user/deleteCarUser',
    async (id, thunkAPI) => {
        try {
            const { extra, dispatch, getState} = thunkAPI
            const state = getState()
            const organizationId = getIdOrganization(state)

            const response = await extra.api.delete('/api/organization-service-category', {
                params: {id}
            })
            
            dispatch(fetchServices(organizationId))
            extra.notificationApi.success({
                message: `Услуга с ID - ${id} удалён`
            })
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
