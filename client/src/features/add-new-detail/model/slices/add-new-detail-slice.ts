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
    rows: [],
    count: 0
  },
  optionsWear: [
    {label: 'Можо использовать', value: DetailWears.CanBeUsed},
    {label: 'Нужен ремонт', value: DetailWears.NeedFix},
    {label: 'Новая', value: DetailWears.New}
  ],
  models: {
    rows: [],
    count: 0
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

        state.detailCategories.rows = data?.rows
        state.detailCategories.count = data?.count
      })

      .addCase(fetchListinModels.fulfilled, (state, action: PayloadAction<ModelsResponse>) => {
        const data = action.payload

        state.models.rows = data?.rows
        state.models.count = data?.count
      })
  }
})

export const {setDetailData, dropDetailData, setPhotosDetail, deletePhotoDetail} = addNewDetailSlice.actions

export const addNewDetailReducer = addNewDetailSlice.reducer