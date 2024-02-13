import Organization from "@models/organization"



export const mapperOrganizationGetOne = (organization: Organization) => {


    return {
        id: organization.dataValues.id,
        name: organization.dataValues.name,
        phoneNumber: organization.dataValues.phoneNumber,
        status: organization.dataValues.status,
        ban: organization.dataValues.ban,
        avatar: organization.dataValues.avatar,
        house: organization.dataValues.Address.dataValues.house,
        street: organization.dataValues.Address.dataValues.street,
        city: organization.dataValues.Address.dataValues.city,
    }
}