import Brand from "@models/brand"


interface Brands {
    rows: Brand[],
    count: number
}

export const getAllBrandsMapper = (brands: Brands) => {

    return {
        total: brands.count,
        items: brands.rows.map((brand) => {
            return {
                id: brand.dataValues.id,
                name: brand.dataValues.name,
            }
        })
    }
}