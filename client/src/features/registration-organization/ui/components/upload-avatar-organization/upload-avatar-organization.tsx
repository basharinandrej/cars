import {ChangeEventHandler, useEffect, useState} from 'react'
import {useAppDispatch} from '@shared'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'

// import {getPhotosDetail} from '../../../model/selectors'
import { setAvatar } from '../../../model/slices/registration-organization-slice'
import { useSelector } from 'react-redux';

import styles from './upload-avatar-organization.module.sass'

const toBase64 = async (file: File) => new Promise<string>((resolve) => {
    const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
        reader.onerror;
});

export const UploadAvatarOrganization = () => {
    const dispatch = useAppDispatch()
    const [photos, setPhotos] = useState<{id: string, path: string}>(null)

    // const avatar = useSelector(getPhotosDetail) as any
    useEffect(() =>  {
        setPhotos(null)

        // toBase64(avatar.file).then((response) => {
        //     setPhotos({id: avatar.id, path: response})
        // })  
    }, [setPhotos])

    const onChangeAvatarHandler:ChangeEventHandler<HTMLInputElement> = async e => {
        const files = Array.from(e.target.files)
        
        dispatch(setAvatar({
            id: files[0].name,
            file: files[0]
        }))
    }

    const onClickDeleteHandler = (id: string) => {
        // dispatch(deletePhotoDetail(id))
    }
    return (
        <div className={styles.uploadBox}>
            {/* {photos?.length ? <div className={styles.previewBox}>
      
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

            </div> : null} */}
            <label className={styles.upload}>
               <div className={styles.uploadIcon}>Загрузить аватар <UploadOutlined /></div>
                <input
                    className={styles.fileInput}
                    accept="image/*" 
                    onChange={onChangeAvatarHandler} 
                    type="file"
                    name="avatar"
                />
            </label>
        </div>

    )
}