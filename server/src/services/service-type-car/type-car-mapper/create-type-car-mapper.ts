import TypeCar from "@models/type-car";


export const createTypeCarMapper = (typeCar: TypeCar) => {
    return {
        id: typeCar.dataValues.id,
        name: typeCar.dataValues.name
    }
}