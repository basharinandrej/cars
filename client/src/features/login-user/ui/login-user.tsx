import { Button, Form, Input } from 'antd'
import {useAppDispatch, AppLink} from '@shared'
import {FieldTypeLoginForm} from '../interfaces'
import { setPassword, setEmail } from '../model/slices/login-user-slice'
import {fetchLoginUserByEmail} from '../model/async-actions/login-user-by-email'
import { useNavigate } from "react-router-dom";

import styles from './login-user.module.sass'


export const LoginUser = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSuccessLogin = () => navigate('/')

    const onFinishHandler = async () => {
        const result = await dispatch(fetchLoginUserByEmail())

        if(result.meta.requestStatus === 'fulfilled') {
            onSuccessLogin()
        }
    }

    const onChange = (value: FieldTypeLoginForm) => {
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
        <Form.Item<FieldTypeLoginForm>
            label="Email"
            name="email"
            className={styles.formItem}
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input id="email" />
        </Form.Item>

        <Form.Item<FieldTypeLoginForm>
            label="Пароль"
            name="password"
            className={styles.formItem}
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password id="password" />
        </Form.Item>

        <Form.Item >
            <Button className={styles.button} type="primary" htmlType="submit">
                Отправить
            </Button>
        </Form.Item>

        <AppLink to={'/login/organization'}>Войти как организация</AppLink>
        <AppLink to={'/registration/user'}>Регистрация</AppLink>
    </Form>
}