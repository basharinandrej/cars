import { DetailWears } from "@common/enums";
import Model from "@models/model";
import {Optional} from "sequelize/types";
import DetailCategory from "./detail-category";
import User from "@models/user";
import DetailPhoto from '@models/detail/detail-photo';


export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    year: string
    description: string
    price: number
    wear: DetailWears

    Model?: Model
    DetailCategory?: DetailCategory
    User?: User
    DetailPhotos?: DetailPhoto[] | DetailPhoto
    
    modelId?: number
    userId?: number
    detailCategoryId?: number
    addressId?: number
    createdAt?: string
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}