import Brand from "@models/brand";


export const createBrandMapper = (brand: Brand) => {
    return {
        id: brand.dataValues.id,
        name: brand.dataValues.name
    }
}