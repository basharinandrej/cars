import User from "@models/user";
import Organization from "@models/organization";
import { OrganizationAttributes } from "@models/organization/types";


interface DataOrganization extends Omit<OrganizationAttributes, 'password' | 'createdAt'> {}


export const mapperOrganizationLogin = (canditate: Organization) => {

    const {id, name, email, phoneNumber, ban, status} = canditate.dataValues

    const data: DataOrganization = {
        id,
        name,
        email,
        phoneNumber: Number(phoneNumber),
        ban,
        status
    }


    return data
}