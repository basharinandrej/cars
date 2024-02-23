import {useState} from 'react'
import {useAppDispatch} from '@shared'

import { Modal, Upload, GetProp, UploadFile, UploadProps} from 'antd'
import { PlusOutlined } from '@ant-design/icons';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = async (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const UploadPhotoDetail = () => {
    const dispatch = useAppDispatch()
    const [fileList, setFileList] = useState<UploadFile[]>()

    // const [previewOpen, setPreviewOpen] = useState(false);
    // const [previewImage, setPreviewImage] = useState('');
    // const [previewTitle, setPreviewTitle] = useState('');

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Прикрепить фото детали</div>
        </button>
    );

    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
        console.log('>>>> newFileList', newFileList)

        // dispatch(setPhotoDetail(newFileList))

        //@ts-ignore
        setFileList(newFileList)
        //@ts-ignore
        // dispatch(setPhotoDetail({
        //     name: file.originFileObj.name,
        //     data: await getBase64(file.originFileObj),
        //     size: file.originFileObj.size,
        //     mimetype: file.originFileObj.type
        // }))
    }

    // const handlePreview = async (file: UploadFile) => {
    //     if (!file.url && !file.preview) {
    //       file.preview = await getBase64(file.originFileObj as FileType);
    //     }
    
    //     setPreviewImage(file.url || (file.preview as string));
    //     setPreviewOpen(true);
    //     setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    // };

    return (
        <>
            <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                // onPreview={handlePreview}
                onChange={handleChange}
            >
                {uploadButton}
                {/* {fileList?.length >= 5 ? null : uploadButton} */}
            </Upload>
            {/* <Modal  open={previewOpen} title={previewTitle} footer={null}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal> */}
        </>
    )
}