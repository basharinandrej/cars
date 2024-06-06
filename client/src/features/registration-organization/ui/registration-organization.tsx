import {Form, FormInstance, Input, InputNumber} from 'antd'
import {
    setName,
    setEmail,
    setPassword,
    setPhoneNumber,
    setHouseNumber,
    setStreet
} from '../model/slices/registration-organization-slice'
import {FormRegistrationOrganizationValueTypes} from '../interfaces'
import { APP_CAR_KEY_LS_ORGANIZATION_ID, AppLink, Button, useAppDispatch } from '@shared';
import {registrationOrganization} from '../model/async-actions/registration-organization'
import styles from './registration-organization.module.sass'
import { useNavigate } from 'react-router-dom';
import { UploadAvatarOrganization } from './components/upload-avatar-organization/upload-avatar-organization';

export const RegistrationOrganization = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSuccessRegistration = () => navigate(`/cabinet/profile/${localStorage.getItem(APP_CAR_KEY_LS_ORGANIZATION_ID)}`)

    const onChangeHandler = (value: FormRegistrationOrganizationValueTypes) => {
        console.log(value)
        value.name && dispatch(setName(value.name))
        value.email && dispatch(setEmail(value.email))
        value.password && dispatch(setPassword(value.password))
        value.phoneNumber && dispatch(setPhoneNumber(value.phoneNumber))
        value.street && dispatch(setStreet(value.street))
        value.house && dispatch(setHouseNumber(value.house))
    }

    const registrationUserHandler = async () => {
        const result = await dispatch(registrationOrganization())

        if(result.meta.requestStatus === 'fulfilled') {
            onSuccessRegistration()
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Регистрация автосервиса</h1>

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

                <UploadAvatarOrganization />
                <Form.Item<FormRegistrationOrganizationValueTypes>
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

                <Form.Item<FormRegistrationOrganizationValueTypes>
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

                <Form.Item<FormRegistrationOrganizationValueTypes>
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
                        (form: FormInstance<FormRegistrationOrganizationValueTypes>) => {
                            form.setFieldValue('passwordDouble', '')

                            return {
                                message: ''
                            }
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item<FormRegistrationOrganizationValueTypes>
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
                        (form: FormInstance<FormRegistrationOrganizationValueTypes>) => {
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
            
                <Form.Item<FormRegistrationOrganizationValueTypes>
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

                <Form.Item<FormRegistrationOrganizationValueTypes>
                    className={styles.formItem}
                    label="Улица"
                    name="street"
                    rules={[
                        {
                            min: 2,
                            message: 'Поле "Улица" должно содержать минимум два символа'
                        },
                        {
                            type: 'string'
                        },
                        {
                            required: true,
                            message: 'Поле "Улица" является обязательным'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormRegistrationOrganizationValueTypes>
                    className={styles.formItem}
                    label="Номер дома"
                    name="house"
                    rules={[
                        () => {
                            return {
                                validator: (_:unknown, value: number) => {
                                    if(typeof value === 'number' && value>0) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('Поле "house" принимает только числа');
                                },
                            }
                        },
                        {
                            required: true,
                            message: 'Поле "house" является обязательным'
                        }
                    ]}
                >
                    <InputNumber className={styles.phoneNumber} controls={false} />
                </Form.Item>

                <Form.Item className={styles.registrationButton}>
                    <Button
                        className={styles.buttonSubmit}
                        htmlType="submit" 
                        text='Зарегистрировать автосервис' 
                    />
                </ Form.Item>
            </Form>
            <AppLink to={'/registration/user'}>Регистрация пользователя</AppLink>
        </div>
        
    )
}