import { Modal, Input, Form } from "antd"
import {FC, useEffect} from 'react'
import {FormUpdateRequestValueTypes} from '../../../interfaces'
import { IRequest } from "@entities";
import {Select, StatusRequest} from '@shared'
import { useSelector } from "react-redux";
import {getIsUser, getIsOrganization} from '../../../model/selectors/selectors'
import {statusMap} from '../../../dictonaries/status-map'


const {TextArea} = Input

export const DetailRequest: FC<Props> = ({
    isModalOpen,
    onOkHandler,
    handleCancel,
    onChangeHandler,
    request
}) => {
    const [form] = Form.useForm();
    const isUser = useSelector(getIsUser)
    const isOrganization = useSelector(getIsOrganization)

    useEffect(() => {
        form.setFieldsValue({
            description: request?.description,
            status: request?.status
        })
    }, [request, form]);
    return (
        <Modal
            title={'Редактировать заявку'}
            cancelText={'Отмена'}
            okText={"Отправить"}
            onOk={onOkHandler}
            onCancel={handleCancel}
            open={isModalOpen}
        >
            <Form
                form={form}
                name={'view-or-update-form'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
            >
                <Form.Item<FormUpdateRequestValueTypes> 
                    label="Описание" 
                    name="description" 
                    required
                >
                    <TextArea disabled={Boolean(isOrganization)}/>
                </Form.Item>

                {<Form.Item<FormUpdateRequestValueTypes>
                    label="Статус"
                    name="status"
                    initialValue={request?.status}
                >
                    <Select
                        disabled={Boolean(isUser)}
                        options={[
                            {label: statusMap[StatusRequest.APPROVED], value: StatusRequest.APPROVED},
                            {label: statusMap[StatusRequest.DECLINED], value: StatusRequest.DECLINED},
                            {label: statusMap[StatusRequest.FINISHED], value: StatusRequest.FINISHED},
                            {label: statusMap[StatusRequest.IN_VIEWING], value: StatusRequest.IN_VIEWING},
                        ]}
                    />
                </Form.Item>}
            </Form>
        </Modal>
    )
}

interface Props {
    isModalOpen: boolean
    onOkHandler: () => void
    handleCancel: () => void
    onChangeHandler: (value: FormUpdateRequestValueTypes) => void
    request?: Partial<Pick<IRequest,  'id'|'description'|'status'>>
}