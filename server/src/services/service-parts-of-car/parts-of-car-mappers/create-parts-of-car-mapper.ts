import PartsOfCar from "@models/parts-of-car";


export const createPartsOfCarMappers = (partsOfCar: PartsOfCar) => {

    return {
        id: partsOfCar.dataValues.id,
        name: partsOfCar.dataValues.name,
        typeCarId: partsOfCar.dataValues.typeCarId
    }
}