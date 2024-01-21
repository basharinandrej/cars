import Detail from "@models/detail"

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
                photos: detail.dataValues.photos,
                state: detail.dataValues.state,
                modelId: detail.dataValues.modelId,
                categoryId: detail.dataValues.categoryId,
                wearId: detail.dataValues.wearId
            }
        })
    }
}