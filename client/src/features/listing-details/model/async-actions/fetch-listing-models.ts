import { createAsyncThunk } from '@reduxjs/toolkit'
import {BrandResponse} from '../../interfaces'
import {ThunkApiConfig} from '@app'
import {ParamsFetchListingModel} from '../../model/interfaces'
import {getFilterSelectedBrandValue} from '../selectors'
import {DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS} from '@shared'

export const fetchListingModels = createAsyncThunk<BrandResponse, void, ThunkApiConfig>(
    'listing-models/fetchListingModels',
    async (_, thunkAPI) => {
        try {
            const {getState, extra} = thunkAPI
            const state = getState()

            const valueSelectedBrand = getFilterSelectedBrandValue(state)

            const params:ParamsFetchListingModel = {
                brandId: valueSelectedBrand,
                limit: DEFAULT_VALUE_LIMIT_FOR_FILTER_CONTROLS
            }
            const response = await extra.api.get('/api/model', {
                params
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