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
                                    //@ts-ignore
                    id: model.dataValues.TypeCar.id,
                                    //@ts-ignore
                    name: model.dataValues.TypeCar.name
                },
                brand: {
                                    //@ts-ignore
                    id: model.dataValues.Brand.id,
                                    //@ts-ignore
                    name: model.dataValues.Brand.name,
                }
            }
        })
    }
}