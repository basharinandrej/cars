import {ChangeEventHandler, useEffect, useState} from 'react'
import {useAppDispatch} from '@shared'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'

import {getPhotosDetail} from '../../../model/selectors'
import { setPhotosDetail, deletePhotoDetail } from '../../../model/slices/add-new-detail-slice'
import { useSelector } from 'react-redux';

import styles from './upload-photo-detail.module.sass'

const toBase64 = async (file: File) => new Promise<string>((resolve) => {
    const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
        reader.onerror;
});

export const UploadPhotoDetail = () => {
    const dispatch = useAppDispatch()
    const [photos, setPhotos] = useState<Array<{id: string, path: string}>>([])

    const photosDetail = useSelector(getPhotosDetail)
    useEffect(() =>  {
        setPhotos([])

        photosDetail.forEach((photoDetail) => {
            toBase64(photoDetail.file).then((response) => {
                setPhotos((prev) => [...prev, {id: photoDetail.id, path: response}])
            })  
        })
    }, [photosDetail, setPhotos])

    const onChangePhotoHandler:ChangeEventHandler<HTMLInputElement> = async e => {
        const files = Array.from(e.target.files)
        
        dispatch(setPhotosDetail(files.map((file) => ({id: file.name, file}))))
    }

    const onClickDeleteHandler = (id: string) => {
        dispatch(deletePhotoDetail(id))
    }
    return (
        <div className={styles.uploadBox}>
            {photos?.length ? <div className={styles.previewBox}>
      
                {photos.map((photo) => <div key={photo.id} className={styles.previewItem}>
                        <div className={styles.delete} onClick={()=>onClickDeleteHandler(photo.id)}>
                            <DeleteOutlined />
                        </div>
                        <img 
                            className={styles.preview}
                            key={photo.id} 
                            src={photo.path}
                            alt="" 
                        />
                    </div>
                )}

            </div> : null}
            {photos.length < 5 && <label className={styles.upload}>
               <div className={styles.uploadIcon}>Загрузить фото <UploadOutlined /></div>
                <input
                    className={styles.fileInput}
                    accept="image/*" 
                    onChange={onChangePhotoHandler} 
                    type="file"
                    name="photos"
                    multiple
                />
            </label>}
        </div>

    )
}