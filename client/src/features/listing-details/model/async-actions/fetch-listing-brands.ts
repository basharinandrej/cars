import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'
import {ParamsFetchListingBrand} from '../../model/interfaces'


export const fetchListingBrands = createAsyncThunk<BrandResponse, string, ThunkApiConfig>(
    'listing-brands/fetchListingBrands',
    async (value, thunkAPI) => {
        try {
            const { extra} = thunkAPI
            const params:ParamsFetchListingBrand = {
                sortBy: 'name',
                orderBy: 'asc',
                keyword: value
            }
            const response = await extra.api.get('/api/brand', {
                params
            })


            return {
                total: response.data.total,
                items: response.data.items.map((brand:any) => {
                    return {
                        value: brand.id.toString(),
                        label: brand.name
                    }
                })
            }
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)