import { DetailWears } from "@common/enums";
import Model from "@models/model";
import {Optional} from "sequelize/types";
import DetailCategory from "./detail-category";
import User from "@models/user";


export interface DetailAttributes {
    id: number
    name: string
    vendorCode: string
    year: number
    description: string
    price: number
    wear: DetailWears
    photo: string

    Model?: Model
    DetailCategory?: DetailCategory
    User?: User 
    
    modelId?: number
    userId?: number
    detailCategoryId?: number
    addressId?: number
    createdAt?: string
}


export interface CreationDetail extends Optional<DetailAttributes, 'id'> {}