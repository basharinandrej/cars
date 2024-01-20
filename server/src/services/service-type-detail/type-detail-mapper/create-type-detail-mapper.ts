import TypeDetail from "@models/type-detail";

export const createTypeDetailMapper = (typeDetail: TypeDetail) => {

    return {
        id: typeDetail.dataValues.id,
        name: typeDetail.dataValues.name,
        partsOfCarId: typeDetail.dataValues.partsOfCarId,
    }
}