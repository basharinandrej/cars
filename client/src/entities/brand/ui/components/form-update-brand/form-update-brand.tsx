import { Dispatch,useEffect, FC, SetStateAction } from "react"
import {Form, Input, Modal } from 'antd'
import {getSelectedBrand} from '../../../model/selectors'
import {updateSelectedBrand} from '../../../model/slices/brand-slice'
import { useSelector } from "react-redux"
import {useAppDispatch} from '@shared'
import {FormAddNewBrandValueTypes} from '../../../interfaces'
import { updateBrand } from '../../../model/async-action/update-brand';

export const FormUpdateBrand:FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedBrand = useSelector(getSelectedBrand)

    const [form] = Form.useForm();

    useEffect(() => {

        form.setFieldsValue({
            name: seletedBrand?.name
        })
    }, [seletedBrand]);

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewBrandValueTypes) => {
        dispatch(updateSelectedBrand(value))
    }
    const onOkHandler = () => {
        dispatch(updateBrand())
        handleOk()
    }
    return (
        <Modal
            title={'Редактировать бренд'}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                form={form}
                name={'update-brand-form'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormAddNewBrandValueTypes> label="Название" name="name" required>
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