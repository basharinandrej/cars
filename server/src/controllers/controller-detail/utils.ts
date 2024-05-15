import {v4} from 'uuid'
import path from 'path'
import {UploadedFile} from 'express-fileupload'

export const moveDetailPhotosToStatic = (photos: UploadedFile[]) => {
    const fileNames: string[] = []

    if(Array.isArray(photos)) {
        photos.forEach((photo) => {
            const fileName = v4() + '.jpg'
            fileNames.push(fileName)
            
            photo.mv(path.resolve(__dirname, '../..', 'static', 'details', fileName))
        })
    }
    return fileNames
}

export const moveDetailOnePhotoToStatic = (photo: UploadedFile) => {
    const fileName = v4() + '.jpg'
    photo.mv(path.resolve(__dirname, '../..', 'static', 'details', fileName))
    
    return fileName
}