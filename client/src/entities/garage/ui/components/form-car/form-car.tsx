import {FC} from 'react'
import {Form, Input, Modal, DatePicker } from 'antd'
import {MIN_LENGTH_VIN_CODE, MAX_LENGTH_VIN_CODE} from '@shared'
import {FormAddNewCarValueTypes} from '../../../interfaces'

import styles from './form-car.module.sass'

export const FormCar:FC<Props> = ({
    isModalOpen,
    handleCancel,
    onOkHandler,
    onChangeHandler,
    title,
    nameForm
}) => {
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                name={nameForm}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormAddNewCarValueTypes>
                    label="VIN-номер"
                    rules={[
                        {
                            min: MIN_LENGTH_VIN_CODE,
                            max: MAX_LENGTH_VIN_CODE,
                            message: 'Vin-номер должен состоять из 17 символов',
                        },
                    ]}
                    name="vinCode"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormAddNewCarValueTypes> label="Бренд" name="brand" required>
                    <Input />
                </Form.Item>

                <Form.Item<FormAddNewCarValueTypes>
                    label="Модель"
                    name="model"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormAddNewCarValueTypes> label="Цвет" name="color" required>
                    <Input />
                </Form.Item>

                <Form.Item<FormAddNewCarValueTypes> label="Год" name="year" required>
                    <DatePicker
                        placeholder=""
                        picker="year"
                        className={styles.yearSelect}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}


interface Props {
    isModalOpen: boolean
    onChangeHandler: (value: FormAddNewCarValueTypes) => void
    onOkHandler: () => void
    handleCancel: () => void
    title: string
    nameForm: string
}