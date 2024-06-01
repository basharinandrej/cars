import { Dispatch,useEffect, FC, SetStateAction } from "react"
import {Form, Input, Modal } from 'antd'
import {getSelectedModel, getBrands} from '../../../model/selectors'
import {updateSelectedModel} from '../../../model/slices/model-slice'
import { useSelector } from "react-redux"
import {SelectSearch, useAppDispatch, useMount} from '@shared'
import {FormAddNewModelValueTypes} from '../../../interfaces'
import { updateModel } from '../../../model/async-action/update-model';
import {fetchListinBrands} from '../../../model/async-action/fetch-listing-brands'

export const FormUpdateModel:FC<Props> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedModel = useSelector(getSelectedModel)
    const brands = useSelector(getBrands)

    useMount(() => {
        dispatch(fetchListinBrands())
    })
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

                <Form.Item<FormAddNewModelValueTypes> 
                   label="Модель"
                   name="brandId"
                   required
                >
                    <SelectSearch options={brands} />
                </Form.Item>
            </Form>
        </Modal>
    )
}
interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}