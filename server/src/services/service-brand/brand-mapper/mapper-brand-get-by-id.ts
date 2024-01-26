import Brand from "@models/brand";



export const mappperBrandGetById = (brand: Brand) => {

    return {
        id: brand.dataValues.id,
        name: brand.dataValues.name,
        models: brand.dataValues.Models.map((model) => {
            return {
                id: model.dataValues.id,
                name: model.dataValues.name,
                brandId: model.dataValues.brandId,
            }            
        })
    }
}