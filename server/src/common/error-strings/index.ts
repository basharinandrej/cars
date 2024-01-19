
export const errorStrings = {

    notBeEmptyField: (field: string) => `Значение поля ${field} не должно быть пустым`,
    minLength: (field: string, lenght: number) => `Значение поля ${field} должно быть больше ${lenght} символов`,
    maxLength: (field: string, lenght: number) => `Значение поля ${field} должно быть меньше ${lenght} символов`,
    beNumber: (field: string) => `Значение поля ${field} должно быть числом`,
    shouldHaveString: (field: string, value: Array<unknown>) => `Значение поля ${field} должно быть одной из этой строки ${value.join(', ')}`,
    userAlreadyExist: (email: string) => `Пользователь с таким email - ${email} уже существует`,
    notFoundUser: (email: string) => `Пользователь с таким email - ${email} не найден`,
    errorPassword: () => `Неверный пароль`
}