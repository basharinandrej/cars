import Detail from "@models/detail"
import {mapperForPhotoDetails} from '../utils'

interface DetailsData {
    count: number,
    rows: Detail[]
}
export const mapperGetAllDetails = (details: DetailsData) => {

    return {
        total: details.count,
        items: details.rows.map(detail  => {
            return {
                id: detail.dataValues.id,
                name: detail.dataValues.name,
                vendorCode: detail.dataValues.vendorCode,
                wear: detail.dataValues.wear,
                year: detail.dataValues.year,
                description: detail.dataValues.description,
                price: detail.dataValues.price,
                createdAt: detail.dataValues.createdAt,


                modelId: detail.dataValues.modelId,
                detailCategoryId: detail.dataValues.detailCategoryId,
                addressId: detail.dataValues.addressId,
                userId: detail.dataValues.userId,
                detailPhoto: mapperForPhotoDetails(detail.dataValues.DetailPhotos, true)
            }
        })
    }
}