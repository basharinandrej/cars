import {useAppDispatch, Button} from '@shared'
import {useState, useEffect} from 'react'
import {Form, Input, Modal } from 'antd'
import {FormAddNewCategoryDetailValueTypes} from '@entities'
import {setCategoryDetail} from '../model/slices/add-new-car-slice'
import {addNewCategoryDetail} from '../model/async-actions/add-new-category-detail'
import { useSelector } from 'react-redux'
import {getIsLoading, getError, getCategoryDetailData} from '../model/selectors'

import styles from './add-new-category-detail.module.sass'


export const FormNewCategoryDetail = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)
    const handleOk = () => setIsModalOpen(false)

    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const categoryDetailData = useSelector(getCategoryDetailData)

    useEffect(() => {
        !isLoading && !error && handleOk()
    }, [isLoading, error])

    useEffect(() => {
        form.setFieldsValue({
            name: categoryDetailData?.name
        })
    }, [categoryDetailData]);
    
    const onOkHandler = () => {
        dispatch(addNewCategoryDetail())
    }

    const onChangeHandler = (value: FormAddNewCategoryDetailValueTypes) => {
        dispatch(setCategoryDetail(value))
    }

    return (
        <div>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>

            <Modal
                title={'Добавить категорию детали'}
                open={isModalOpen}
                onCancel={handleCancel}
                cancelText={'Отмена'}
                okText={'Отправить'}
                onOk={onOkHandler}
            >
                <Form
                    name={'add-cat-detail-form'}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                    form={form}
                >
                    

                    <Form.Item<FormAddNewCategoryDetailValueTypes> label="Название" name="name" required>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}