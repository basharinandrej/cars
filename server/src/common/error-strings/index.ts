import { SortOrder, UserRoles } from "@common/enums";

export const errorStrings = {

    notBeEmptyField: (field: string) => `Значение поля ${field} не должно быть пустым`,
    minLength: (field: string, lenght: number) => `Значение поля ${field} должно быть больше ${lenght} символов`,
    maxLength: (field: string, lenght: number) => `Значение поля ${field} должно быть меньше ${lenght} символов`,
    beNumber: (field: string) => `Значение поля ${field} должно быть числом`,
    shouldHaveString: (field: string, value: Array<unknown>) => `Значение поля ${field} должно быть одним из этой строки ${value.join(', ')}`,
    
    userAlreadyExist: (email: string) => `Пользователь с таким email - ${email} уже существует`,
    categoryAlreadyExist: (value: string) => `Категория - ${value} уже есть. Категория должна быть уникальной`,
    
    notFoundUser: (email: string) => `Пользователь с таким email - ${email} не найден`,
    notFoundBrand: (id: number) => `Brand с таким id - ${id} не найден`,
    errorPassword: () => `Неверный пароль`,
    onlyForAdmin: () => `Доступно только для пользователя с ролью ${UserRoles.ADMIN}`,
    unauthorized: () => `Неавторизон`,
    expireToken: () => `Токен истёк`,
    uncorrectEmail: () => `Некорректный email`,
    uncorrectRole: () => `Некорректная роль у пользователя`,
    checkLengthPhoneNumber: () => `Количество символов для phoneNumber === 11`,


    sorderValue: () => `Направление сортировки может быть только ${SortOrder.ASC}, ${SortOrder.DESC}`,
    //SORT
    sort: {
        brandSort: (value: string, errorValue: string) => `Сортировать brand можно только по полю ${value}, а не по полю ${errorValue}`
    }
}