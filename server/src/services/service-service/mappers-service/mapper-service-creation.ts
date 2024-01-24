import Service from "@models/service";


export const mapperServiceCreation = (service: Service) => {
    return {
        id: service.dataValues.id,
        name: service.dataValues.name,
        price: service.dataValues.price,
        description: service.dataValues.description,
        userId: service.dataValues.userId,
        serviceCategoryId: service.dataValues.serviceCategoryId
    }
}