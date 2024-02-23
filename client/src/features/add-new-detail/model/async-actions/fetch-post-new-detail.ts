import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataDetail} from '../selectors'


export const fetchPostNewDetail = createAsyncThunk<void, any, ThunkApiConfig>(
    'add-new-detail/fetchPostNewDetail',
    async (photos, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const detail = getDataDetail(state)

            const data = new FormData()
            data.append('name', `${detail.name}`)
            data.append('wear', `${detail.wear}`)
            data.append('detailCategoryId', `${detail.detailCategoryId}`)
            data.append('modelId', `${detail.modelId}`)
            data.append('photos', photos)
            data.append('price', `${detail.price}`)
            data.append('vendorCode', `${detail.vendorCode}`)
            data.append('year', `${detail.year}`)

            const response = await extra.api.post('/api/detail', data)


            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)