import Car from "@models/car";



export const mapperCarGetByVinCode = (car: Car) => {

    return {
        vinCode: car.dataValues.vinCode,
        brand: car.dataValues.brand,
        model: car.dataValues.model,
        color: car.dataValues.color,
        year: car.dataValues.year,
    }
}