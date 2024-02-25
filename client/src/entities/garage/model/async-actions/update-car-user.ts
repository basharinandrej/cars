import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedCarForUpdate} from '../selectors/index'
import {fetchCarUser} from '../async-actions/fetch-cars-user'

export const updateCarUser = createAsyncThunk<string|boolean, void, ThunkApiConfig>(
    'update-car-user/updateCarUser',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedCar = getSelectedCarForUpdate(state)


            const response = await extra.api.put('/api/car', selectedCar)
            dispatch(fetchCarUser())

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
