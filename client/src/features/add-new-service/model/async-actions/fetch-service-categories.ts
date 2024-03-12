import { createAsyncThunk } from '@reduxjs/toolkit'
import {ServiceCategoryResponse} from '@entities'
import {ThunkApiConfig} from '@app'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'

export const fetchListingServiceCategories = createAsyncThunk<ServiceCategoryResponse, void, ThunkApiConfig>(
    'listing-service-categories/fetchListingServiceCategories',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
      
            const response = await extra.api.get('/api/service-category', {
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