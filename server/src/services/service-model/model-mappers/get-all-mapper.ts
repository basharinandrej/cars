import Model from '@models/model'

interface Models {
    rows: Model[];
    count: number;
}

export const mapperGetAllModel = (models: Models) => {
    return {
        length: models.rows.length,
        items: models.rows.map((model) => {
            return {
                id: model.dataValues.id,
                name: model.dataValues.name,
                typeCar: {
                    id: model.dataValues.TypeCar.id,
                    name: model.dataValues.TypeCar.name
                },
                brand: {
                    id: model.dataValues.Brand.id,
                    name: model.dataValues.Brand.name,
                }
            }
        })
    }
}