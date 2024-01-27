import {getHashPassword} from '../get-hash-password/index'

export const compareHashPassword = async (password, hashPassword) => {
    if(await getHashPassword(password) === hashPassword) {
        return true
    } else {
        return false
    }
}