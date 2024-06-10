import {ChangeEventHandler, useEffect, useState} from 'react'
import {useAppDispatch} from '@shared'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import {getAvatarOrganization} from '../../../model/selectors'
import { setAvatar, deleteAvatar } from '../../../model/slices/registration-organization-slice'
import { useSelector } from 'react-redux';

import styles from './upload-avatar-organization.module.sass'

const toBase64 = async (file: File) => new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader?.result as string);
    file && reader.readAsDataURL(file);
    reader.onerror;
});

export const UploadAvatarOrganization = () => {
    const dispatch = useAppDispatch()
    const [preview, setPreview] = useState<{id: string, path: string}>(null)

    const avatar = useSelector(getAvatarOrganization)
    useEffect(() =>  {
        setPreview(null)

        avatar && toBase64(avatar?.file)
            .then((response) => {
                setPreview({id: avatar.id, path: response})
            })
    }, [setPreview, avatar])

    const onChangeAvatarHandler:ChangeEventHandler<HTMLInputElement> = async e => {
        const files = Array.from(e.target.files)
        
        dispatch(setAvatar({
            id: files[0]?.name,
            file: files[0]
        }))
    }

    const onClickDeleteHandler = () => {
        setPreview(null)
        dispatch(deleteAvatar())
    }

    return (
        <div className={styles.uploadBox}>
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

            {preview?.id ? <div className={styles.previewBox}>
                <div className={styles.previewItem}>
                    <div className={styles.delete} onClick={() => onClickDeleteHandler()}>
                        <DeleteOutlined />
                    </div>
                    <img 
                        className={styles.preview}
                        key={preview.id} 
                        src={preview.path}
                        alt="" 
                    />
                </div>
            </div> : null}
        </div>

    )
}