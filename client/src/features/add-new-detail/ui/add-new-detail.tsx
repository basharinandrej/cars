import {Button, Select, SelectSearch, useMount, useAppDispatch} from '@shared'
import { useSelector } from 'react-redux'
import {useState} from 'react'
import {DatePicker, Form, Input, Modal, InputNumber  } from 'antd'
import {fetchListingCategories} from '../model/async-actions/fetch-listing-categories'
import {
    getItemsDetailCategories,
    getItemsModels,
    getOptionsWear
} from '../model/selectors'
import {fetchListinModels} from '../model/async-actions/fetch-listing-models'
import {setDetailData} from '../model/slices/add-new-detail-slice'
import {fetchAddNewDetail} from '../model/async-actions/fetch-add-new-detail'
import {FormAddNewDetailValueTypes} from '../interfaces'
import {UploadPhotoDetail} from './components/upload-photo-detail/upload-photo-detail'



import styles from './add-new-detail.module.sass'


export const AddNewDetail = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)

    const detailCategories = useSelector(getItemsDetailCategories)
    const models = useSelector(getItemsModels)
    const optionsWear = useSelector(getOptionsWear)

    useMount(() => {
        dispatch(fetchListinModels())
        dispatch(fetchListingCategories())
    })
    const onChangeHandler = (value: FormAddNewDetailValueTypes) => {
        delete value.year
        dispatch(setDetailData(value))
    }

    const onOkHandler = () => {
        dispatch(fetchAddNewDetail())
        setIsModalOpen(false)
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
                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Название"
                        name="name"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Артикул"
                        name="vendorCode"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Износ"
                        name="wear"
                        required
                    >
                        <Select options={optionsWear} />
                    </Form.Item>

                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Цена"
                        name="price"
                        required
                        rules={[
                            () => {
                                return {
                                    validator: (_:unknown, value: number) => {
                                        if(typeof value === 'number' && value>0) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Цена должна быть положительным числом');
                                    },
                                }
                            }
                        ]}
                    >
                        <InputNumber className={styles.priceInput} />
                    </Form.Item>
                    
                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Модель"
                        name="modelId"
                        required
                    >
                        <SelectSearch options={models} />
                    </Form.Item>

                    <Form.Item<FormAddNewDetailValueTypes>
                        label="Категория детали"
                        name="detailCategoryId"
                        required
                    >
                        <SelectSearch options={detailCategories} />
                    </Form.Item>
                
                     <Form.Item<FormAddNewDetailValueTypes>
                        label="Год"
                        name="year"
                        required
                    >
                        <DatePicker picker="year" placeholder="" className={styles.yearSelect} />
                    </Form.Item>

                    <UploadPhotoDetail />
                </Form>
            </Modal>
        </div>
    )
}