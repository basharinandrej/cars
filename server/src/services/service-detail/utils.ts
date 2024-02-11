import DetailPhoto from '@models/detail/detail-photo';

export const mapperForPhotoDetails = (detailPhoto: DetailPhoto | DetailPhoto[], onlyFirstPhoto = false) => {
    
    if(Array.isArray(detailPhoto)) {
        const result = detailPhoto.map((photo) => {
            return {
                id: photo.dataValues.id,
                url: photo.dataValues.url,
                detailId: photo.dataValues.detailId
            }
        })
        return onlyFirstPhoto ? result[0] : result
    }else{
        return {
            id: detailPhoto.dataValues.id,
            url: detailPhoto.dataValues.url,
            detailId: detailPhoto.dataValues.detailId
        }
    }
}