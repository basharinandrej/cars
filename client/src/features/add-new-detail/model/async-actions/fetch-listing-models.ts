import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'

export const fetchListinModels = createAsyncThunk<any, void, ThunkApiConfig>(
    'listing-models/fetchListinModels',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
      
            const response = await extra.api.get('/api/model', {
                params: {
                    limit: DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS
                }
            })


            return {
                total: response.data.total,
                items: response.data.items.map((model:any) => {
                    return {
                        value: model.id,
                        label: model.name
                    }
                })
            }
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
