import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {getDataDetail} from '../selectors'


export const fetchAddNewDetail = createAsyncThunk<void, void, ThunkApiConfig>(
    'add-new-detail/fetchPostNewDetail',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const detail = getDataDetail(state)

            const data = new FormData()
            data.append('name', `${detail.name}`)
            data.append('wear', `${detail.wear}`)
            data.append('detailCategoryId', `${detail.detailCategoryId}`)
            data.append('modelId', `${detail.modelId}`)
            data.append('price', `${detail.price}`)
            data.append('vendorCode', `${detail.vendorCode}`)
            data.append('year', `${detail.year}`)


            for(let i = 0; i < detail.photos.length; i++) {
                const photo = detail.photos[i].file

                data.append('photos', photo)
            }

            const response = await extra.api.post('/api/detail', data)


            return response.data
        } catch (error) {
            const {extra} = thunkAPI
            const errorMessage = extra.getErrorMessage(error)

            extra.notificationApi.error({
                message: 'Ошибка при добавлении новой детали',
                description: errorMessage
            })
            throw errorMessage
        }
    }
)