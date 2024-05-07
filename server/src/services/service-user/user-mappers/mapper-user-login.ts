import User from "@models/user";
import {UserAttributes} from  "@models/user/types"


interface DataUser extends Omit<UserAttributes, 'password' | 'createdAt'> {}


export const mapperUserLogin = (canditate: User) => {

    const {id, name, surname, email, role, phoneNumber, ban} = canditate.dataValues

    const data: DataUser = {
        id,
        name,
        surname,
        email,
        role,
        phoneNumber: Number(phoneNumber),
        ban
    }


    return data
}