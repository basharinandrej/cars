import Wear from "@models/wear"

interface WearData {
    count: number,
    rows: Wear[]
}
export const mapperWearGerAll = (wears: WearData) => {
    return {
        total: wears.count,
        items: wears.rows.map((wear) => {
            return {
                id: wear.dataValues.id,
                name: wear.dataValues.name,
                description: wear.dataValues.description,
            }
        })
    }
}