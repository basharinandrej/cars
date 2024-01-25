import User from "@models/user";


interface Users {
    rows: User[];
    count: number;
}

export const getAllUserMapper = (users: Users) => {

    return {
        total: users.count,
        items: users.rows.map((user) => {
            return {
                id: user.dataValues.id,
                name: user.dataValues.name,
                surname: user.dataValues.surname,
                email: user.dataValues.email,
                role: user.dataValues.role,

                balance: user.dataValues.balance,
                addres: user.dataValues.addres,
                banType: user.dataValues.banType,
                avatar: user.dataValues.avatar,
            }
        })
    }
}