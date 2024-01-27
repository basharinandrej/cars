import Request from "@models/request";



export const mapperRequestGetById = (request: Request) => {

    return {
        id: request.dataValues.id,
        description: request.dataValues.description,
        status: request.dataValues.status,
        service: {
            id: request.dataValues.Service.dataValues.id,
            name: request.dataValues.Service.dataValues.name,
            description: request.dataValues.Service.dataValues.description,
            price: request.dataValues.Service.dataValues.price,
        },
        recipient: {
            id: request.dataValues.Organization.dataValues.id,
            name: request.dataValues.Organization.dataValues.name,
            email: request.dataValues.Organization.dataValues.email,
            ban: request.dataValues.Organization.dataValues.ban,
            phoneNumber: request.dataValues.Organization.dataValues.id,
        },
        sender: {
            id: request.dataValues.User.dataValues.id,
            name: request.dataValues.User.dataValues.name,
            email: request.dataValues.User.dataValues.email,
            ban: request.dataValues.User.dataValues.ban,
            phoneNumber: request.dataValues.User.dataValues.id,
            role: request.dataValues.User.dataValues.id,
        }
    }
}