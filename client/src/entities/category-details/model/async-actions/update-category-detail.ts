import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getSelectedCategoryDetail} from '../selectors/index'
import {fetchCategoryDetails} from '../async-actions/fetch-category-details'

export const updateCategoryDetail = createAsyncThunk<void, void, ThunkApiConfig>(
    'update-category-detail/updateCategoryDetail',
    async (_, thunkAPI) => {
        try {
            const {getState, extra, dispatch} = thunkAPI
            const state = getState()

            const selectedCategoryDetail = getSelectedCategoryDetail(state)


            const response = await extra.api.put('/api/detail-category', selectedCategoryDetail)
            dispatch(fetchCategoryDetails())

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
