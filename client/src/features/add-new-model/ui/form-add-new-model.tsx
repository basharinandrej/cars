import {useAppDispatch, Button} from '@shared'
import {useState, useEffect} from 'react'
import {Form, Input, Modal } from 'antd'
import {FormAddNewBrandValueTypes} from '@entities'
import {setModel} from '../model/slices/add-new-model-slice'
import {addNewModel} from '../model/async-actions/add-new-model'
import { useSelector } from 'react-redux'
import {getIsLoading, getError, getModelData} from '../model/selectors'

import styles from './form-add-new-model.module.sass'


export const FormAddNewModel = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)
    const handleOk = () => setIsModalOpen(false)

    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const brandData = useSelector(getModelData)

    useEffect(() => {
        !isLoading && !error && handleOk()
    }, [isLoading, error])

    useEffect(() => {
        form.setFieldsValue({
            name: brandData?.name
        })
    }, [brandData]);
    
    const onOkHandler = () => {
        dispatch(addNewModel())
    }

    const onChangeHandler = (value: FormAddNewBrandValueTypes) => {
        dispatch(setModel(value))
    }

    return (
        <div>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>

            <Modal
                title={'Добавить модель автомобиля'}
                open={isModalOpen}
                onCancel={handleCancel}
                cancelText={'Отмена'}
                okText={'Отправить'}
                onOk={onOkHandler}
            >
                <Form
                    name={'add-model-form'}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                    form={form}
                >
                    

                    <Form.Item<FormAddNewBrandValueTypes> label="Название" name="name" required>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}