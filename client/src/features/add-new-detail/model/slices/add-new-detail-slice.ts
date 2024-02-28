import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {DetailWears} from '@shared'
import {fetchListingCategories} from '../async-actions/fetch-listing-categories'
import {fetchListinModels} from '../async-actions/fetch-listing-models'
import { 
  FormAddNewDetailValueTypes,
  ModelsResponse,
  DetailCategoryResponse
} from '../../interfaces'


interface OptionWear {
  label: string, value: DetailWears
}

interface Photo {
  id: string
  file: File
}

export interface AddNewDetailSchema {
  detailCategories: DetailCategoryResponse,
  models: ModelsResponse,
  optionsWear: Array<OptionWear>,
  detail: {
    name: string | null
    vendorCode: string | null
    wear: DetailWears | null
    year: string | null
    price: number | null
    modelId: number | null
    detailCategoryId: number | null
    photos: Photo[]
  }
}

const initialState: AddNewDetailSchema = {
  detailCategories: {
    items: [],
    total: 0
  },
  optionsWear: [
    {label: 'Можо использовать', value: DetailWears.CanBeUsed},
    {label: 'Нужен ремонт', value: DetailWears.NeedFix},
    {label: 'Новая', value: DetailWears.New}
  ],
  models: {
    items: [],
    total: 0
  },
  detail: {
    name: '',
    vendorCode: '',
    wear: null,
    year: '',
    price: null,
    modelId: null,
    detailCategoryId: null,
    photos: []
  }
}

export const addNewDetailSlice = createSlice({
  name: 'add-new-detail',
  initialState,
  reducers: {
    setDetailData: (state, action: PayloadAction<FormAddNewDetailValueTypes>) => {
      state.detail = {
        ...state.detail, ...action.payload
      }
    },
    dropDetailData: (state) => {
      state.detail = {
        name: '',
        vendorCode: '',
        wear: null,
        year: '',
        price: null,
        modelId: null,
        detailCategoryId: null,
        photos: []
      }
    },
    setPhotosDetail: (state, action: PayloadAction<Photo[]>) => {
      state.detail.photos = [...state.detail.photos, ...action.payload]
    },
    deletePhotoDetail: (state, action: PayloadAction<string>) => {
      state.detail.photos = state.detail.photos.filter((photo) => photo.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListingCategories.fulfilled, (state, action: PayloadAction<DetailCategoryResponse>) => {
        const data = action.payload

        state.detailCategories.items = data?.items
        state.detailCategories.total = data?.total
      })

      .addCase(fetchListinModels.fulfilled, (state, action: PayloadAction<ModelsResponse>) => {
        const data = action.payload

        state.models.items = data?.items
        state.models.total = data?.total
      })
  }
})

export const {setDetailData, dropDetailData, setPhotosDetail, deletePhotoDetail} = addNewDetailSlice.actions

export const addNewDetailReducer = addNewDetailSlice.reducer