import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {fetchBrands, Brand} from '@entities'
import {getBrandData} from '../selectors'

export const addNewBrand = createAsyncThunk<Brand, void, ThunkApiConfig>(
    'add-new-brand/addNewBrand',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()
            const brand = getBrandData(state)


            const response = await extra.api.post<Brand>('/api/brand', brand)

            dispatch(fetchBrands())
            return response.data
            
        } catch (error: unknown) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении нового бренда',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)
