import Brand from "@models/brand";


export const mapperBrandCreation = (brand: Brand) => {
    return {
        id: brand.dataValues.id,
        name: brand.dataValues.name
    }
}