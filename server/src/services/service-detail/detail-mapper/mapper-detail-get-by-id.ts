import Deteail from '@models/detail'

export const mapperDetailGetById = (detail: Deteail) => {
    return {
        id: detail.dataValues.id,
        vendorCode: detail.dataValues.vendorCode,
        name: detail.dataValues.name,
        wear: detail.dataValues.wear,
        year: detail.dataValues.year,
        description: detail.dataValues.description,
        price: detail.dataValues.price,
        model: {
            id: detail.dataValues.Model.dataValues.id,
            name: detail.dataValues.Model.dataValues.name,
            brandId: detail.dataValues.Model.dataValues.id
        },
        detailCategory: {
            id: detail.dataValues.DetailCategory.dataValues.id,
            name: detail.dataValues.DetailCategory.dataValues.name
        },
        user: {
            id: detail.dataValues.User.dataValues.id,
            name: detail.dataValues.User.dataValues.name,
            surname: detail.dataValues.User.dataValues.surname,
            email: detail.dataValues.User.dataValues.email,
            role: detail.dataValues.User.dataValues.role,
            phoneNumber: detail.dataValues.User.dataValues.phoneNumber,
            ban: detail.dataValues.User.dataValues.ban,
        }
    }
}