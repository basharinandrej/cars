
import {DtoDetailPhotoCreation} from "./types"

class DtoDetailPhoto {

    getDtoDetailOnePhotoCreation(urlPhoto: string, detailId: number): DtoDetailPhotoCreation {

        return {
            url: urlPhoto,
            detailId: detailId
        }
    }

    getDtoDetailAllPhotosCreation(urlPhotos: string[], detailId: number): DtoDetailPhotoCreation[] {

        return urlPhotos.map((urlPhoto) => {
            return this.getDtoDetailOnePhotoCreation(urlPhoto, detailId)
        })
    }
}

export default new DtoDetailPhoto()