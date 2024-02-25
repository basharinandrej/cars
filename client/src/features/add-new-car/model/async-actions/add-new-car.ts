import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCarUser} from '@entities'
import { CarResponse } from '../../interfaces'
import {getCarData} from '../selectors'


export const addNewCar = createAsyncThunk<CarResponse, void, ThunkApiConfig>(
    'add-new-car/addNewCar',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const car = getCarData(state)
            const response = await extra.api.post<CarResponse>('/api/car', car)
            dispatch(fetchCarUser())
            return response.data
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении нового автомобиля',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
