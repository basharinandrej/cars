import Service from "@models/service";

interface ServicesData {
    rows: Service[]
    count: number
}

export const mapperServiceGetAll = (services: ServicesData) => {
    return {
        total: services.count,
        items: services.rows.map((service) => {
            return {
                id: service.dataValues.id,
                name: service.dataValues.name,
                price: service.dataValues.price,
                description: service.dataValues.description,
                userId: service.dataValues.userId,
                serviceCategoryId: service.dataValues.serviceCategoryId,
                user: {
                    id: service.dataValues.User.id,
                    name: service.dataValues.User.name,
                    email: service.dataValues.User.email,
                },
                serviceCategory: {
                    id: service.dataValues.ServiceCategory.id,
                    name: service.dataValues.ServiceCategory.name,
                    description: service.dataValues.ServiceCategory.description
                }
            }
        })

    }
}