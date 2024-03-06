import { Dispatch,useEffect, FC, SetStateAction } from "react"
import {Form, Input, Modal } from 'antd'
import {getSelectedCategoryService} from '../../../model/selectors'
import {updateSelectedCategoryService} from '../../../model/slices/category-service-slice'
import { useSelector } from "react-redux"
import {useAppDispatch} from '@shared'
import {FormAddNewCategoryServiceValueTypes} from '../../../interfaces'
import {updateCategoryService} from '../../../model/async-actions/update-category-service'

export const FormUpdateCategoryService:FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedCategoryService = useSelector(getSelectedCategoryService)

    const [form] = Form.useForm();

    useEffect(() => {

        form.setFieldsValue({
            name: seletedCategoryService?.name
        })
    }, [seletedCategoryService]);

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewCategoryServiceValueTypes) => {
        dispatch(updateSelectedCategoryService(value))
    }
    const onOkHandler = () => {
        dispatch(updateCategoryService())
        handleOk()
    }
    return (
        <Modal
            title={'Редактировать категорию детали'}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                form={form}
                name={'update-category-form'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormAddNewCategoryServiceValueTypes> label="Название" name="name" required>
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