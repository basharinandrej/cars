import Car from "@models/car"

interface CarData {
    count: number,
    rows: Car[]
}

export const mapperCarGetAll = (car:CarData) => {


    return {
        total: car.count,
        items: car.rows.map((car) => {
            return {
                vinCode: car.dataValues.vinCode,
                brand: car.dataValues.brand,
                model: car.dataValues.model,
                year: car.dataValues.year,
                color: car.dataValues.color,
            }
        })
    }
}