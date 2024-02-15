import Service from "@models/organization-service-category";

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
                organization: {
                    id: service.dataValues.Organization.id,
                    name: service.dataValues.Organization.name,
                    email: service.dataValues.Organization.email,
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