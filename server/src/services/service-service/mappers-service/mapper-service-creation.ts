import Service from "@models/organization-service-category";


export const mapperServiceCreation = (service: Service) => {
    return {
        id: service.dataValues.id,
        name: service.dataValues.name,
        price: service.dataValues.price,
        description: service.dataValues.description,
        organizationId: service.dataValues.organizationId,
        serviceCategoryId: service.dataValues.serviceCategoryId
    }
}