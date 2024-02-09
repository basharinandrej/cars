import Model from '@models/model'

interface Models {
    rows: Model[];
    count: number;
}

export const mapperModelGetAll = (models: Models) => {
    return {
        total: models.count,
        items: models.rows.map((model) => {
            return {
                id: model.dataValues.id,
                name: model.dataValues.name,
                brand: {
                    id: model.dataValues.Brand.id,
                    name: model.dataValues.Brand.name,
                }
            }
        })
    }
}