import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {ListingDetailsSchema} from '../slice/listing-details-slice'

const instanceAxios = axios.create({
    baseURL: process.env.CLIENT_APP_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

export const fetchListingDetails = createAsyncThunk<ListingDetailsSchema, void, any>(
    'listing-details/fetchDetails',
    async () => {
        
        try {
            const response = await instanceAxios.get('/api/detail')

            return response.data
        } catch (error) {
            console.log('>>> error', error)
        }
    }
)