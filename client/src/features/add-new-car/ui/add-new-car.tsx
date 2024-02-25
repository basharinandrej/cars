import {Button, useAppDispatch} from '@shared'
import {useState} from 'react'
import {Form, Input, Modal, DatePicker } from 'antd'
import { setCar } from '../model/slices/add-new-car-slice'
import {addNewCar} from '../model/async-actions/add-new-car'
import {MAX_LENGTH_VIN_CODE, MIN_LENGTH_VIN_CODE} from '../constans'
import {FormAddNewCarValueTypes} from '../interfaces'

import styles from './add-new-car.module.sass'


export const AddNewCard = () => {
    const dispatch = useAppDispatch()

    const [isModalOpen, setIsModalOpen] = useState(true);

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => setIsModalOpen(false)
    const handleCancel = () => setIsModalOpen(false)

    const onChangeHandler = (value: FormAddNewCarValueTypes) => {
        dispatch(setCar(value))
    }

    const onOkHandler = () => {
        dispatch(addNewCar())
        // handleOk()
    }

    return (
        <div>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>
            <Modal
                title="Добавить машину" 
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
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                >
                    <Form.Item<FormAddNewCarValueTypes>
                        label="VIN-номер"
                        rules={[{
                            min: MIN_LENGTH_VIN_CODE,
                            max: MAX_LENGTH_VIN_CODE,
                            message: 'Vin-номер должен состоять из 17 символов'
                        }]}
                        name="vinCode"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewCarValueTypes>
                        label="Бренд"
                        name="brand"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewCarValueTypes>
                        label="Модель"
                        name="model"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewCarValueTypes>
                        label="Цвет"
                        name="color"
                        required
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormAddNewCarValueTypes>
                        label="Год"
                        name="year"
                        required
                    >
                        <DatePicker placeholder='' picker="year" className={styles.yearSelect} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}