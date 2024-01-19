import TypeCar from "@models/type-car";


export const typeCarMapper = (typeCar: TypeCar) => {
    return {
        id: typeCar.dataValues.id,
        name: typeCar.dataValues.name
    }
}