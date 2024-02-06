import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'
import {ParamsFetchListingModel} from '../../model/interfaces'
import {getFilterSelectedBrandId} from '../selectors'


export const fetchListingModels = createAsyncThunk<BrandResponse, void, ThunkApiConfig>(
    'listing-models/fetchListingModels',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const idSelectedBrand = getFilterSelectedBrandId(state)

            const params:ParamsFetchListingModel = {
                brandId: idSelectedBrand
            }
            const response = await extra.api.get('/api/model', {
                params
            })


            return {
                total: response.data.total,
                items: response.data.items.map((model:any) => {
                    return {
                        value: model.id.toString(),
                        label: model.name
                    }
                })
            }
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)