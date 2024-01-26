import Deteail from '@models/detail'

export const mapperDetailGetById = (detail: Deteail) => {
    return {
        id: detail.dataValues.id,
        vendorCode: detail.dataValues.vendorCode,
        name: detail.dataValues.name,
        wear: detail.dataValues.wear,
        year: detail.dataValues.year,
        description: detail.dataValues.description,
        price: detail.dataValues.price,
    }
}