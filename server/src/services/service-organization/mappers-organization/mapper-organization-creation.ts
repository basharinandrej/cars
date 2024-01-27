import Organization from "@models/organization"


export const mapperOrganizationCreation = (organization: Organization) => {

    return {
        id: organization.dataValues.id,
        name: organization.dataValues.name,
        email: organization.dataValues.email,
        phoneNumber: organization.dataValues.phoneNumber,
        ban: organization.dataValues.ban
    }
}