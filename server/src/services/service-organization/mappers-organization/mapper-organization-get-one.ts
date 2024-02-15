import Organization from "@models/organization"



export const mapperOrganizationGetOne = (organization: Organization) => {


    return {
        id: organization.dataValues.id,
        name: organization.dataValues.name,
        phoneNumber: organization.dataValues.phoneNumber,
        status: organization.dataValues.status,
        ban: organization.dataValues.ban,
        avatar: organization.dataValues.avatar,
        addresses: organization.dataValues.Addresses.map((address) => {
            return {
                id: address.dataValues.id,
                city: address.dataValues.city,
                house: address.dataValues.house,
                street: address.dataValues.street,
            }
        }),
        services: organization.dataValues.Services.map((service) => {
            return {
                id: service.dataValues.id,
                name: service.dataValues.name,
                description: service.dataValues.description,
                price: service.dataValues.price
            }
        })
    }
}