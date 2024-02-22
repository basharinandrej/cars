import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import { CarResponse } from '../../interfaces'
import {getCarData} from '../selectors'


export const featchPostCar = createAsyncThunk<CarResponse, void, ThunkApiConfig>(
    'add-new-car/featchPostCar',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const car = getCarData(state)
            const response = await extra.api.post<CarResponse>('/api/car', car)
            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
