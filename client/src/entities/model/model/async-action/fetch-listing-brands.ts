import { createAsyncThunk } from '@reduxjs/toolkit'
import {ThunkApiConfig} from '@app'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'
import { BrandsResponse } from '../../interfaces'

export const fetchListinBrands = createAsyncThunk<BrandsResponse, void, ThunkApiConfig>(
    'listing-brands/fetchListinBrands',
    async (_, thunkAPI) => {
        try {
            const { extra} = thunkAPI
      
            const response = await extra.api.get('/api/brand', {
                params: {
                    sortBy: 'name',
                    orderBy: 'asc',
                    limit: DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS,

                }
            })


            return {
                count: response.data.total,
                rows: response.data.rows.map((brand:any) => {
                    return {
                        value: brand.id,
                        label: brand.name
                    }
                })
            }
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)
