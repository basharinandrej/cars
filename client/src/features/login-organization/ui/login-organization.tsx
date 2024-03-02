import { Button, Form, Input } from 'antd'
import {useAppDispatch, AppLink} from '@shared'
import {FieldTypeLoginOrganizationForm} from '../interfaces'
import { setPassword, setEmail } from '../model/slices/login-organization-slice'
import {fetchLoginOrganizationByEmail} from '../model/async-actions/login-organization-by-email'
import { useNavigate } from "react-router-dom";

import styles from './login-organization.module.sass'


export const LoginOrganization = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSuccessLogin = () => navigate('/')

    const onFinishHandler = async () => {
        const result = await dispatch(fetchLoginOrganizationByEmail())

        if(result.meta.requestStatus === 'fulfilled') {
            onSuccessLogin()
        }
    }

    const onChange = (value: FieldTypeLoginOrganizationForm) => {
        const {password, email} = value

        password && dispatch(setPassword(password))
        email && dispatch(setEmail(email))
    }
    return <Form
            name="basic"
            labelCol={{ span: 8 }}
            onFinish={onFinishHandler}
            onValuesChange={onChange}
            className={styles.form}
            autoComplete="off"
            preserve={false}
        >
        <Form.Item<FieldTypeLoginOrganizationForm>
            label="Email"
            name="email"
            className={styles.formItem}
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input id="email" />
        </Form.Item>

        <Form.Item<FieldTypeLoginOrganizationForm>
            label="Пароль"
            name="password"
            className={styles.formItem}
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password id="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Отправить
            </Button>
        </Form.Item>

        <AppLink to={'/login/user'}>Войти как пользователь</AppLink>
    </Form>
}