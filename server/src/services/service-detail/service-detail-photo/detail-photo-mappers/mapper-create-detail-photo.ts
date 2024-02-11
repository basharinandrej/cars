import DetailPhoto from "@models/detail/detail-photo"

export const mapperCreateDetailPhoto = (detailPhoto: DetailPhoto) => {
    return {
        id: detailPhoto.dataValues.id,
        url: detailPhoto.dataValues.url,
        detailId: detailPhoto.dataValues.detailId
    }
}