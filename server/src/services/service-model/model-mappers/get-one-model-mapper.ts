import Model from "@models/model"


export const getOneModelMapper = (model: Model) => {

    return {
        id: model.dataValues.id,
        name: model.dataValues.name,
        typeCarId: model.dataValues.typeCarId,
        brandId: model.dataValues.brandId,
        details: model.dataValues.Details.map((detail) => {
            return {
                id: detail.id,
                name: detail.name,
                vendorCode: detail.vendorCode,
                wear: detail.wear,
                year: detail.year,
                description: detail.description,
                proce: detail.price,
                photos: detail.photos,
                state: detail.state,
                typeDetailId: detail.typeDetailId,
                modelId: detail.modelId
            }
        })
    }
}