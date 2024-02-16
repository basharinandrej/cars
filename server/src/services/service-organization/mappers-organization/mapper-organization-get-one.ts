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
        serviceCategories: organization.dataValues.serviceCategories.map((serviceCategory) => {
            return {
                id: serviceCategory.dataValues.id,
                name: serviceCategory.dataValues.name,
                organizationServiceCategory: {
                    id: serviceCategory.dataValues.OrganizationServiceCategory.dataValues.id,
                    name: serviceCategory.dataValues.OrganizationServiceCategory.dataValues.name,
                    description: serviceCategory.dataValues.OrganizationServiceCategory.dataValues.description,
                    price: serviceCategory.dataValues.OrganizationServiceCategory.dataValues.price,
                }
            }
        })
    }
}