import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'
import {ParamsFetchListingBrand} from '../../model/interfaces'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'

export const fetchListingBrands = createAsyncThunk<BrandResponse, string, ThunkApiConfig>(
    'listing-brands/fetchListingBrands',
    async (value, thunkAPI) => {
        try {
            const { extra} = thunkAPI
            const params:ParamsFetchListingBrand = {
                sortBy: 'name',
                orderBy: 'asc',
                keyword: value,
                limit: DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS
            }
            const response = await extra.api.get('/api/brand', {
                params
            })


            return {
                total: response.data.total,
                items: response.data.items.map((brand:any) => {
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
