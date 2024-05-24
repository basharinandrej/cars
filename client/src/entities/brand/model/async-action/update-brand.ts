import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedBrand} from '../selectors/index'
import {fetchBrands} from '../async-action/fetch-brands'

export const updateBrand = createAsyncThunk<void, void, ThunkApiConfig>(
    'update-brand/updateBrand',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedCategoryDetail = getSelectedBrand(state)


            const response = await extra.api.put('/api/brand', selectedCategoryDetail)
            extra.notificationApi.success({
                message: `Бренд с ID - ${selectedCategoryDetail.id} обновлён`,
            })
            dispatch(fetchBrands())

            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при обновлении бренда',
                description: errorMessage
            })
            throw errorMessage         
        }
    }
)
