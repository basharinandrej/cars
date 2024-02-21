import { useSelector } from 'react-redux'
import {getDataUser, getIsEditing} from '../model/selectors'
import { Form, Input, Button } from 'antd';
import {Select, UserRoles, useAppDispatch} from '@shared'
import {FieldType} from '../types/types'
import {setIsEditing, setUserData} from '../model/slices/profile-slice'
import {featchUpdateUser} from '../model/async-actions/fetch-update-user'

import styles from './profile.module.sass'


export const Profile = () => {
    const dispatch = useAppDispatch()
    const user = useSelector(getDataUser)
    const isEditing = useSelector(getIsEditing)
      
    const onFinishHandler = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        dispatch(featchUpdateUser())
    };

    const onChangeHandler = (value: FieldType) => {
        dispatch(setIsEditing(true))
        dispatch(setUserData(value))
    }

    return (
        <div>
            <h2 className={styles.title}>Личная информация</h2>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onValuesChange={onChangeHandler}
                onFinish={onFinishHandler}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Имя"
                    name="name"
                    initialValue={user.name}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Фамилия"
                    name="surname"
                    initialValue={user.surname}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    initialValue={user.email}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Телефон"
                    name="phoneNumber"
                    initialValue={user.phoneNumber}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Роль"
                    name="role"
                    initialValue={user.role}
                >
                    <Select
                        disabled
                        options={[
                            {label: UserRoles.Admin, value: UserRoles.Admin},
                            {label: UserRoles.Moderator, value: UserRoles.Moderator},
                            {label: UserRoles.Person, value: UserRoles.Person},
                        ]}
                    />
                </Form.Item>

                <Form.Item className={styles.button}>
                    <Button disabled={!isEditing} type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}