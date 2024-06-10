import { Modal, Form, Input } from "antd"
import {useAppDispatch} from '@shared'
import {Dispatch, SetStateAction, FC} from 'react'
import { FormAddNewRequestValueTypes } from "../interfaces/interfaces";
import { setRequestData } from "../model/slices/add-new-request-slice";
import {getIdProfile} from '../model/selectors/index'
import { useSelector } from "react-redux";
import {addNewRequest} from '../model/async-actions/add-new-request'


const { TextArea } = Input;


export const AddNewRequest: FC<Props> = ({
    idSelectedOrganization,
    setIdSelectedOrganization
}) => {
    const dispatch = useAppDispatch()

    const senderId = useSelector(getIdProfile)
    const handleCancel = () => {
        setIdSelectedOrganization(false)
    }
    const onOkHandler = () => {
        dispatch(addNewRequest())
        handleCancel()
    }
    const onChangeHandler = (value: FormAddNewRequestValueTypes) => {
        idSelectedOrganization && dispatch(setRequestData({
            description: value.description,
            recipientId: idSelectedOrganization,
            senderId: senderId
        }))
    }


    return (
        <Modal
            title={'Отправить заявку'}
            open={Boolean(idSelectedOrganization)}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                name={'add-request'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >

                <Form.Item
                    label="Описание"
                    name="description"
                    required
                >
                    <TextArea />
                </Form.Item>

            </Form>
        </Modal>
    )
}

interface Props {
    idSelectedOrganization: false|number
    setIdSelectedOrganization: Dispatch<SetStateAction<number|boolean>>
}