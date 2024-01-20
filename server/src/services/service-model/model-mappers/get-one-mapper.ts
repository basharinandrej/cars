import Model from "@models/model"


export const getOneModelMapper = (model: Model) => {


    return {
        id: model.dataValues.id,
        name: model.dataValues.name,
        typeCarId: model.dataValues.typeCarId,
        brandId: model.dataValues.brandId
    }
}