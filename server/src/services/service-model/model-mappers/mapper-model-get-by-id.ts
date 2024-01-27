import Model from "@models/model"


export const mapperModelGetById = (model: Model) => {

    return {
        id: model.dataValues.id,
        name: model.dataValues.name,
        details: model.dataValues.Details.map((detail) => {
            return {
                id: detail.id,
                name: detail.name,
                vendorCode: detail.vendorCode,
                wear: detail.wear,
                year: detail.year,
                description: detail.description,
                price: detail.price,
            }
        }),
        brand: {
            id: model.dataValues.Brand.id,
            name: model.dataValues.Brand.name
        }
    }
}