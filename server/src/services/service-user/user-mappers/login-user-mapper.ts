import User from "@models/user";
import {UserAttributes} from  "@models/user/types"


interface DataUser extends Omit<UserAttributes, 'password' | 'createdAt'> {}


export const loginUserMapper = (canditate: User) => {

    const {id, name, surname, email, role, phoneNumber, avatar, balance, addres, banType} = canditate.dataValues

    const data: DataUser = {
        id,
        name,
        surname,
        email,
        role,
        phoneNumber: Number(phoneNumber),
    }

    if(avatar) data.avatar = avatar
    if(balance) data.balance = balance
    if(addres) data.addres = addres
    if(banType) data.banType = banType
    

    return data
}