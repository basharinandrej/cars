import { SortOrderBy, UserRoles } from "@common/enums";
import {MAX_COUNT_ADMINS, MAX_TOTAL_PHOTOS_PER_DETAIL} from '@common/constans'

export const errorStrings = {

    notBeEmptyField: (field: string) => `Значение поля ${field} не должно быть пустым`,
    notBeEmptyVariable: (variable: string) => `Значение переменной ${variable} не должно быть пустым`,

    minLength: (field: string, lenght: number) => `Значение поля ${field} должно быть больше ${lenght} символов`,
    maxLength: (field: string, lenght: number) => `Значение поля ${field} должно быть меньше ${lenght} символов`,
    beNumber: (field: string) => `Значение поля ${field} должно быть числом`,
    shouldHaveString: (field: string, value: Array<unknown>) => `Значение поля ${field} должно быть одним из этой строки ${value.join(', ')}`,
    
    userAlreadyExist: (email: string) => `Пользователь с таким email - ${email} уже существует`,
    categoryAlreadyExist: (value: string) => `Категория - ${value} уже есть. Категория должна быть уникальной`,
    organizationAlreadyExist: (email: string) => `Организация с таким email - ${email} уже существует`,

    notFound: (candidate) => `Не найден ${candidate}`,
    notFoundUser: (email: string) => `Пользователь с таким email - ${email} не найден`,
    notFoundBrand: (id: number) => `Brand с таким id - ${id} не найден`,
    notFoundCar: (vinCode: string) => `Car с таким vinCode - ${vinCode} не найден`,
    errorPassword: () => `Неверный пароль`,

    onlyForAdmin: () => `Доступно только для пользователя с ролью ${UserRoles.Admin}`,

    onlyForOrganiztion: () => `Доступно только для организации`,

    unauthorized: () => `Неавторизон`,
    expireToken: () => `Токен истёк`,
    uncorrectEmail: () => `Некорректный email`,
    uncorrectRole: () => `Некорректная роль у пользователя`,
    uncorrectAddress: (key: string) => `Некорректный адрес ${key}`,
    checkLengthPhoneNumber: () => `Количество символов для phoneNumber === 11`,
    failedToAddPhoto: () => `Неудалось добавить фото`,
    mustBeAtLeastOnePhoto: () => 'Должно быть хотя бы одно фото',
    maxTotalPhotosDetail: () => `Максимальное количесвто фотографий для детали ${MAX_TOTAL_PHOTOS_PER_DETAIL}`,
    onlyOnePhoto:`Можно добавить только одно фото`,
    canNotDeleteAdmin: 'Нельзя удалить пользователя с ролью ADMIN',

    sorderValue: () => `Направление сортировки может быть только ${SortOrderBy.Asc}, ${SortOrderBy.Desc}`,
    //SORT
    sort: {
        brandSort: (value: string, errorValue: string) => `Сортировать brand можно только по полю ${value}, а не по полю ${errorValue}`
    },
    withoutOrganization: () => `Организация не может закрепить за собой машину`,
    maxCountAdmins: () => `Максимальное число администраторов ${MAX_COUNT_ADMINS}`
}