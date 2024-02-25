

import {UserRoles} from '../enums'


export const mapUserRole = {
    [UserRoles.Admin]: 'Администратор',
    [UserRoles.Moderator]: 'Модератор',
    [UserRoles.Person]: 'Пользователь'
}