import Car from "@models/car";



export const mapperCarGetByVinCode = (car: Car) => {

    return {
        vinCode: car.dataValues.vinCode,
        brand: car.dataValues.brand,
        model: car.dataValues.model,
        color: car.dataValues.color,
        year: car.dataValues.year,
        user: {
            id: car.dataValues.User?.dataValues.id,
            name: car.dataValues.User?.dataValues.name,
            surname: car.dataValues.User?.dataValues.surname,
            email: car.dataValues.User?.dataValues.email,
            role: car.dataValues.User?.dataValues.role,
            ban: car.dataValues.User?.dataValues.ban,
            phoneNumber: car.dataValues.User?.dataValues.phoneNumber
        }
    }
}