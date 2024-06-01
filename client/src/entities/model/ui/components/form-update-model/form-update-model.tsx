import { Dispatch,useEffect, FC, SetStateAction } from "react"
import {Form, Input, Modal } from 'antd'
import {getSelectedModel} from '../../../model/selectors'
import {updateSelectedModel} from '../../../model/slices/model-slice'
import { useSelector } from "react-redux"
import {useAppDispatch} from '@shared'
import {FormAddNewModelValueTypes} from '../../../interfaces'
import { updateModel } from '../../../model/async-action/update-model';

export const FormUpdateModel:FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedModel = useSelector(getSelectedModel)

    const [form] = Form.useForm();

    useEffect(() => {

        form.setFieldsValue({
            name: seletedModel?.name
        })
    }, [seletedModel]);

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewModelValueTypes) => {
        dispatch(updateSelectedModel(value))
    }
    const onOkHandler = () => {
        dispatch(updateModel())
        handleOk()
    }
    return (
        <Modal
            title={'Редактировать модель'}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                form={form}
                name={'update-model-form'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormAddNewModelValueTypes> label="Название" name="name" required>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}