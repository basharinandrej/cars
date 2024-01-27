import ServiceCategory from "@models/service/service-category"

interface ServiceCategoryData {
    count: number
    rows: ServiceCategory[]
}

export const mapperServiceCategoryGetAll = (data: ServiceCategoryData) => {
    return {
        total: data.count,
        items: data.rows.map((serviceCategory) => {
            return {
                id: serviceCategory.dataValues.id,
                name: serviceCategory.dataValues.name,
                description: serviceCategory.dataValues.description
            }
        })
    }
}