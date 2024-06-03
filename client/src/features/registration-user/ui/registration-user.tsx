import {Form, FormInstance, Input, InputNumber} from 'antd'
import {
    setName,
    setSurname,
    setEmail,
    setPassword,
    setPhoneNumber
} from '../model/slices/registration-user-slice'
import {FormRegistrationUserValueTypes} from '../interfaces'
import { APP_CAR_KEY_LS_USER_ID, Button, useAppDispatch } from '@shared';
import {registrationUser} from '../model/async-actions/registration-user'
import styles from './registration-user.module.sass'
import { useNavigate } from 'react-router-dom';

export const RegistrationUser = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSuccessRegistration = () => navigate(`/cabinet/profile/${localStorage.getItem(APP_CAR_KEY_LS_USER_ID)}`) // cabinet/profile/58

    const onChangeHandler = (value: FormRegistrationUserValueTypes) => {
        value.name && dispatch(setName(value.name))
        value.surname && dispatch(setSurname(value.surname))
        value.email && dispatch(setEmail(value.email))
        value.password && dispatch(setPassword(value.password))
        value.phoneNumber && dispatch(setPhoneNumber(value.phoneNumber))

    }

    const registrationUserHandler = async () => {
        const result = await dispatch(registrationUser())

        if(result.meta.requestStatus === 'fulfilled') {
            onSuccessRegistration()
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Регистрация</h1>

            <Form
                form={form}
                className={styles.form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onValuesChange={onChangeHandler}
                onFinish={registrationUserHandler}
                autoComplete="off"
            >
                    <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="Имя"
                        name="name"
                        rules={[
                            {
                                min: 2,
                                message: 'Поле "Имя" должно содержать минимум два символа'
                            },
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                                message: 'Поле "Имя" является обязательным'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="Фамилия"
                        name="surname"
                        rules={[
                            {
                                min: 2,
                                message: 'Поле "Фамилия" должно содержать минимум два символа'
                            },
                            {
                                type: 'string'
                            },
                            {
                                required: true,
                                message: 'Поле "Фамилия" является обязательным'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Поле "E-mail" должно быть такого формата - user@mail.ru'
                            },
                            {
                                required: true,
                                message: 'Поле "E-mail" является обязательным'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="Пароль"
                        name="password"
                        required
                        rules={[
                            {
                                min: 8,
                                message: 'Поле "Пароль" должно содержать минимум 8 символов'
                            },
                            {
                                required: true,
                                message: 'Поле "Пароль" является обязательным'
                            },
                            (form: FormInstance<FormRegistrationUserValueTypes>) => {
                                form.setFieldValue('passwordDouble', '')

                                return {
                                    message: ''
                                }
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    
                    <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="Повторите пароль"
                        name="passwordDouble"
                        rules={[
                            {
                                min: 8,
                                message: 'Поле "Повторите пароль" должно содержать минимум 8 символов'
                            },
                            {
                                required: true,
                                message: 'Поле "Повторите пароль" является обязательным'
                            },
                            (form: FormInstance<FormRegistrationUserValueTypes>) => {
                                const password = form.getFieldValue('password')

                                return {
                                    validator: (_:unknown, value: number) => {
                                        if(password === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Пароли должны совпадать');
                                    },
                                }
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                     <Form.Item<FormRegistrationUserValueTypes>
                        className={styles.formItem}
                        label="Номер телефона"
                        name="phoneNumber"
                        rules={[
                            () => {
                                return {
                                    validator: (_:unknown, value: number) => {
                                        if(typeof value === 'number' && value>0) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Поле "phoneNumber" принимает только числа');
                                    },
                                }
                            },
                            {
                                required: true,
                                message: 'Поле "phoneNumber" является обязательным'
                            }
                        ]}
                    >
                        <InputNumber className={styles.phoneNumber} controls={false} />
                    </Form.Item>

                    <Form.Item className={styles.registrationButton}>
                        <Button
                            className={styles.buttonSubmit}
                            htmlType="submit" 
                            text='Зарегистрировать пользователя' 
                        />
                    </ Form.Item>
                </Form>
        </div>
        
    )
}