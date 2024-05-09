import {getHashPassword} from '../get-hash-password/index'

export const compareHashPassword = async (password: string, hashPassword: string) => {
    if(await getHashPassword(password) === hashPassword) {
        return true
    } else {
        return false
    }
}