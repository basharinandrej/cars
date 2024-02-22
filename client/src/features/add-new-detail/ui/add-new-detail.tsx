import {Button, Select, SelectSearch, useAppDispatch} from '@shared'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import {Form, Input, Modal } from 'antd'
import {fetchListingCategories} from '../model/async-actions/fetch-listing-categories'
import {
    getItemsDetailCategories,
    getItemsModels,
    getOptionsWear
} from '../model/selectors'
import {fetchListinModels} from '../model/async-actions/fetch-listing-models'
import {setDetailData} from '../model/slices/add-new-detail-slice'



import styles from './add-new-detail.module.sass'



export const AddNewDetail = () => {
    const dispatch = useAppDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const detailCategories = useSelector(getItemsDetailCategories)
    const models = useSelector(getItemsModels)
    const optionsWear = useSelector(getOptionsWear)

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => setIsModalOpen(false)
    const handleCancel = () => setIsModalOpen(false)

    const onChangeHandler = (value: any) => {
        dispatch(setDetailData(value))
    }

    const onOkHandler = () => {
        handleOk()
    }

    const onSearchSelectCategoryHandler = () => {
        dispatch(fetchListingCategories())
    };

    const onSearchSelectModelHandler = () => {
        dispatch(fetchListinModels())
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