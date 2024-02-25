import {FC, useEffect} from 'react'
import {Form, Input, Modal, DatePicker } from 'antd'
import {MIN_LENGTH_VIN_CODE, MAX_LENGTH_VIN_CODE} from '@shared'
import dayjs from 'dayjs';
import {Car, FormAddNewCarValueTypes} from '../../../interfaces'

import styles from './form-car.module.sass'

export const FormCar:FC<Props> = ({
    isModalOpen,
    handleCancel,
    onOkHandler,
    onChangeHandler,
    title,
    nameForm,
    initialValues,
    okText = 'Отправить'
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        initialValues?.vinCode && form.setFieldsValue({
            vinCode: initialValues?.vinCode,
            brand: initialValues?.brand,
            color: initialValues?.color,
            model: initialValues?.model,
            year: dayjs(initialValues?.year, 'YYYY')
        })
    }, [initialValues]);

    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={okText}
            onOk={onOkHandler}
        >
            <Form
                form={form}
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
    okText?: string
    initialValues?: Car
}