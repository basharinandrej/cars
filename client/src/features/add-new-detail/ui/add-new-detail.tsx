import {Button, Select, SelectSearch, useAppDispatch} from '@shared'
import { useSelector } from 'react-redux'
import {useState} from 'react'
import {Form, Input, Modal  } from 'antd'
import {fetchListingCategories} from '../model/async-actions/fetch-listing-categories'
import {
    getItemsDetailCategories,
    getItemsModels,
    getOptionsWear
} from '../model/selectors'
import {fetchListinModels} from '../model/async-actions/fetch-listing-models'
import {setDetailData} from '../model/slices/add-new-detail-slice'
import {fetchPostNewDetail} from '../model/async-actions/fetch-post-new-detail'

import styles from './add-new-detail.module.sass'



export const AddNewDetail = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [photos, setPhotos] = useState()

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)

    const detailCategories = useSelector(getItemsDetailCategories)
    const models = useSelector(getItemsModels)
    const optionsWear = useSelector(getOptionsWear)

    const onChangeHandler = (value: any) => {
        dispatch(setDetailData({...value}))
    }

    const onOkHandler = () => {
        dispatch(fetchPostNewDetail(photos))
        setIsModalOpen(false)
    }

    const onSearchSelectCategoryHandler = () => {
        dispatch(fetchListingCategories())
    };

    const onSearchSelectModelHandler = () => {
        dispatch(fetchListinModels())
    }

    function onChangePhotoHandler(e: any) {
        const file =  e.target.files[0]
        console.log('>>> file', file)
        setPhotos(file)
    }

    return (
        <div>
            <div className={styles.addButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>
            <Modal
                title="Добавить деталь" 
                open={isModalOpen} 
                onCancel={handleCancel}
                cancelText={'Отмена'}
                okText={'Отправить'}
                onOk={onOkHandler}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Название"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Артикул"
                        name="vendorCode"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Износ"
                        name="wear"
                    >
                        <Select options={optionsWear} />
                    </Form.Item>

                    <Form.Item
                        label="Цена"
                        name="price"
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Модель"
                        name="modelId"
                    >
                        <SelectSearch options={models} onSearch={onSearchSelectModelHandler} />
                    </Form.Item>

                    <Form.Item
                        label="Категория детали"
                        name="detailCategoryId"
                    >
                        <SelectSearch options={detailCategories} onSearch={onSearchSelectCategoryHandler}/>
                    </Form.Item>

                    <input
                        accept="image/*" 
                        onChange={onChangePhotoHandler} 
                        type="file"
                        name="img"
                    />                  
                     {/* <Form.Item
                        label="Год"
                        name="year"
                    >
                        <DatePicker picker="year" className={styles.yearSelect} />
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    )
}