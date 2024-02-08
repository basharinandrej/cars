import { createAsyncThunk } from '@reduxjs/toolkit'
import {CategoryResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'

export const fetchListingCategories = createAsyncThunk<CategoryResponse, void, ThunkApiConfig>(
    'listing-categories/fetchListingCategories',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
      
            const response = await extra.api.get('/api/detail-category', {
                params: {
                    limit: DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS
                }
            })


            return {
                total: response.data.total,
                items: response.data.items.map((category:any) => {
                    return {
                        value: category.id,
                        label: category.name
                    }
                })
            }
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
