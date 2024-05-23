import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'
import { DetailCategoryResponse } from '../../interfaces'

export const fetchListingCategories = createAsyncThunk<DetailCategoryResponse, void, ThunkApiConfig>(
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
                count: response.data.count,
                rows: response.data.rows.map((category:any) => {
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
