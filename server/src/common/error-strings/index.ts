
export const errorStrings = {

    notBeEmptyField: (field: string) => `Значение поля ${field} не должно быть пустым`,
    minLength: (field: string, lenght: number) => `Значение поля ${field} должно быть больше ${lenght} символов`,
    beNumber: (field: string) => `Значение поля ${field} должно быть числом`
}