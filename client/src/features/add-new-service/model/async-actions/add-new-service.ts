import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataService, getIdOrganization} from '../selectors'
import {dropServiceData} from '../slices/add-new-service-slice'
import { fetchServices } from '../../../listing-services/model/async-actions/fetch-services'


export const fetchAddNewService =  createAsyncThunk<void, void, ThunkApiConfig>(
    'add-new-service/fetchAddNewService',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const service = getDataService(state)

            const response = await extra.api.post('/api/organization-service-category', service)


            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой услуги',
                description: errorMessage
            })
            throw errorMessage
        }finally {
            const {dispatch, getState} = thunkAPI
            const state = getState()
            const idOrganization = getIdOrganization(state)

            dispatch(dropServiceData())
            dispatch(fetchServices(idOrganization))
        }
    }
)