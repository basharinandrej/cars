import {instanceAxios} from '@shared'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandResponse, Brand} from '../../interfaces/interfaces'
import {ThunkApiConfig} from '@app'
import {ParamsFetchListingBrand} from '../../model/interfaces'


export const fetchListingBrands = createAsyncThunk<BrandResponse, void, ThunkApiConfig>(
    'listing-details/fetchListingBrands',
    async () => {
        try {
            const params:ParamsFetchListingBrand = {
                sortBy: 'name',
                orderBy: 'asc'
            }
            const response = await instanceAxios.get('/api/brand', {
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
