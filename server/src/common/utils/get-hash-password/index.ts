import crypto from 'crypto'

export const getHashPassword = async (password: string) => {
    return await crypto.createHash('sha256').update(password).digest('hex')
}