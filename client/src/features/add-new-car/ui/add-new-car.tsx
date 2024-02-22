import {Button, useAppDispatch} from '@shared'
import {useState} from 'react'
import { useSelector } from 'react-redux'
import {Form, Input, Modal, DatePicker } from 'antd'
import { setCar } from '../model/slices/add-new-car-slice'
import {featchPostCar} from '../model/async-actions/fetch-post-car'
import {getCarData} from '../model/selectors'

import styles from './add-new-car.module.sass'




export const AddNewCard = () => {
    const dispatch = useAppDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const car = useSelector(getCarData)

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => setIsModalOpen(false)
    const handleCancel = () => setIsModalOpen(false)

    const onChangeHandler = (value: any) => {
        dispatch(setCar(value))
    }

    const onOkHandler = () => {
        dispatch(featchPostCar())
        handleOk()
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
                    initialValues={{ remember: true }}
                    onValuesChange={onChangeHandler}
                    autoComplete="off"
                >
                    <Form.Item
                        label="VIN-номер"
                        name="vinCode"
                        validateStatus={car.vinCode.length < 17 || car.vinCode.length > 17 ? 'error' : ''}
                        help={car.vinCode.length < 17 || car.vinCode.length > 17 ? 'Vin-номер должен состоять из 17 символов':''}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Бренд"
                        name="brand"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Модель"
                        name="model"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Цвет"
                        name="color"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Год"
                        name="year"
                    >
                        <DatePicker picker="year" className={styles.yearSelect} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}