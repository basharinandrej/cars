import {useAppDispatch, Button} from '@shared'
import {useState, useEffect} from 'react'
import {Form, Input, Modal } from 'antd'
import {FormAddNewCategoryServiceValueTypes} from '@entities'
import {setCategoryService} from '../model/slices/add-new-category-service-slice'
import {addNewCategoryService} from '../model/async-actions/add-new-category-service'
import { useSelector } from 'react-redux'
import {getIsLoading, getError, getCategoryServiceData} from '../model/selectors'

import styles from './add-new-category-service.module.sass'


export const FormNewCategoryService = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)
    const handleOk = () => setIsModalOpen(false)

    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const categoryServiceData = useSelector(getCategoryServiceData)

    useEffect(() => {
        !isLoading && !error && handleOk()
    }, [isLoading, error])

    useEffect(() => {
        form.setFieldsValue({
            name: categoryServiceData?.name
        })
    }, [categoryServiceData]);
    
    const onOkHandler = () => {
        dispatch(addNewCategoryService())
    }

    const onChangeHandler = (value: FormAddNewCategoryServiceValueTypes) => {
        dispatch(setCategoryService(value))
    }

    return (
        <div>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>

            <Modal
                title={'Добавить категорию услуги'}
                open={isModalOpen}
                onCancel={handleCancel}
                cancelText={'Отмена'}
                okText={'Отправить'}
                onOk={onOkHandler}
            >
                <Form
                    name={'add-cat-service-form'}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                    form={form}
                >
                    

                    <Form.Item<FormAddNewCategoryServiceValueTypes> label="Название" name="name" required>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}