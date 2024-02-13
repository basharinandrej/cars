import Organization from "@models/organization"

interface Organizations {
    rows: Organization[];
    count: number;
}

export const mapperOrganizationsGetAll = (organizations: Organizations) => {

    return {
        total: organizations.count,
        items: organizations.rows.map((organization) => {
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
                })
            }
        })
    }
}
