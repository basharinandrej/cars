import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchCarUser, Car} from '@entities'
import {getCarData} from '../selectors'

export const addNewCar = createAsyncThunk<Car, void, ThunkApiConfig>(
    'add-new-car/addNewCar',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()
            const car = getCarData(state)


            const response = await extra.api.post<Car>('/api/car', car)

            extra.notificationApi.success({
                message:  `Машина с vinCode - ${response.data.vinCode} добавлена`,
            })
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
