import { Dispatch,useEffect, FC, SetStateAction } from "react"
import {Form, Input, Modal } from 'antd'
import {getSelectedCategoryDetail} from '../../../model/selectors'
import {updateSelectedCategoryDetail} from '../../../model/slices/category-details-slice'
import { useSelector } from "react-redux"
import {useAppDispatch} from '@shared'
import {FormAddNewCategoryDetailValueTypes} from '../../../interfaces'
import {updateCategoryDetail} from '../../../model/async-actions/update-category-detail'

export const FormUpdateCategoryDetail:FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedCategoryDetail = useSelector(getSelectedCategoryDetail)

    const [form] = Form.useForm();

    useEffect(() => {

        form.setFieldsValue({
            name: seletedCategoryDetail?.name
        })
    }, [seletedCategoryDetail]);

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewCategoryDetailValueTypes) => {
        dispatch(updateSelectedCategoryDetail(value))
    }
    const onOkHandler = () => {
        dispatch(updateCategoryDetail())
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
                <Form.Item<FormAddNewCategoryDetailValueTypes> label="Название" name="name" required>
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