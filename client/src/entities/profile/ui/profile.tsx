import { useSelector } from 'react-redux'
import {getDataUser} from '../model/selectors'
import { Form, Input, Button } from 'antd';
import {Select, UserRoles} from '@shared'

type FieldType = {
    name: string
    surname: string
    email: string
    phoneNumber: number
    role: UserRoles
}

export const Profile = () => {
    
    const user = useSelector(getDataUser)
    
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value: any) => {
        console.log('value:', value);
    }

    return (
        <div>
            <h2>Личная информация</h2>

            <br />
            <br />
            <br />

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onValuesChange={onChange}
                onFinishFailed={onFinishFailed}
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
                    <Input />
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
                        options={[
                            {label: UserRoles.Admin, value: UserRoles.Admin},
                            {label: UserRoles.Moderator, value: UserRoles.Moderator},
                            {label: UserRoles.Person, value: UserRoles.Person},
                        ]}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}