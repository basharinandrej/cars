import {FC, useEffect, Dispatch, SetStateAction} from 'react'
import {Form, Input, Modal } from 'antd'
import {FormUpdateUserValueTypes} from '../../../../interfaces/interfaces'
import { useSelector } from 'react-redux';
import {getSelectedUserUpdate, getRoleOptions} from '../../../../model/selectors'
import {Select, useAppDispatch} from '@shared'
import {updateSelectedUser} from '../../../../model/slices/users-slice'
import {updateUser} from '../../../../model/async-actions/update-user'
import {getIsDisabledSelectRole} from '../../../../model/selectors'



export const FormUpdateUser:FC<Props> = ({
    isModalOpen,
    setIsModalOpen
}) => {
    const dispatch = useAppDispatch()

    const [form] = Form.useForm();
    const initialValues = useSelector(getSelectedUserUpdate)
    const roleOptions = useSelector(getRoleOptions)
    const roleIsDisabled = useSelector(getIsDisabledSelectRole)

    useEffect(() => {

        form.setFieldsValue({
            name: initialValues?.name,
            surname: initialValues?.surname,
            email: initialValues?.email,
            role: initialValues?.role,
            ban: initialValues?.ban
        })
    }, [initialValues]);


    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormUpdateUserValueTypes) => {
        dispatch(updateSelectedUser(value))
    }
    const onOkHandler = () => {
        dispatch(updateUser())
        setIsModalOpen(false)
    }

    return (
        <Modal
            title={'Редактировать пользователя'}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                form={form}
                name={'update-user'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormUpdateUserValueTypes> label="Имя" name="name" required>
                    <Input />
                </Form.Item>

                <Form.Item<FormUpdateUserValueTypes>
                    label="Фамилия"
                    name="surname"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormUpdateUserValueTypes> label="Email" name="email" required>
                    <Input disabled />
                </Form.Item>

                <Form.Item<FormUpdateUserValueTypes> 
                    label="Роль" 
                    name="role" 
                    required
                >
                    <Select disabled={roleIsDisabled} options={roleOptions}/>
                </Form.Item>

                <Form.Item<FormUpdateUserValueTypes> label="Бан" name="ban" required>
                    <Input disabled/>
                </Form.Item>
            </Form>
        </Modal>
    )
}


interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}