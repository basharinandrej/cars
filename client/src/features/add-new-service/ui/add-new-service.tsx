import {Button, SelectSearch, useAppDispatch, useMount} from '@shared'
import {Form, Input, InputNumber, Modal } from 'antd'
import {useState, useEffect} from 'react'
import {FormAddNewServiceValueTypes} from '@entities'
import {fetchListingServiceCategories} from '../model/async-actions/fetch-service-categories'
import {fetchAddNewService} from '../model/async-actions/add-new-service'
import {getItemsServiceCategories, getOrganizationId, getDataService} from '../model/selectors'
import {setService} from '../model/slices/add-new-service-slice'
import styles from './add-new-service.module.sass'
import { useSelector } from 'react-redux'

const {TextArea} = Input


export const AddNewServices = () => {
    const [form] = Form.useForm();

    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true)
    const handleCancel = () => setIsModalOpen(false)


    useMount(() => {
        dispatch(fetchListingServiceCategories())
    })
    const serviceCategories = useSelector(getItemsServiceCategories)
    const organizationId = useSelector(getOrganizationId)
    const initialValues = useSelector(getDataService)

    const onOkHandler = () => {
        dispatch(fetchAddNewService())
        handleCancel()
    }

    const onChangeHandler = (value: FormAddNewServiceValueTypes) => {
        dispatch(setService({...value, organizationId}))
    }


    useEffect(() => {

        form.setFieldsValue({
            name: initialValues?.name,
            description: initialValues?.description,
            price: initialValues?.price,
            serviceCategoryId: initialValues.serviceCategoryId,
            organizationId: initialValues.organizationId
        })
    }, [initialValues]);

    return <div>
        <div className={styles.carButton}>
            <Button text='Добавить' onClick={showModal} />
        </div>

        <Modal
            title={'Добавить новую услугу'}
            open={isModalOpen}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Отправить'}
            onOk={onOkHandler}
        >
            <Form
                form={form}
                name={'add-new-service'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onValuesChange={onChangeHandler}
                autoComplete="off"
            >
                <Form.Item<FormAddNewServiceValueTypes>
                    label="Название"
                    name="name"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item<FormAddNewServiceValueTypes> label="Описание" name="description" required>
                    <TextArea />
                </Form.Item>

                <Form.Item<FormAddNewServiceValueTypes>
                    label="Цена"
                    name="price"
                    required
                    rules={[
                        () => {
                            return {
                                validator: (_:unknown, value: number) => {
                                    if(typeof value === 'number' && value>0) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject('Цена должна быть положительным числом');
                                },
                            }
                        }
                    ]}
                >
                    <InputNumber className={styles.price} />
                </Form.Item>

                <Form.Item<FormAddNewServiceValueTypes> label="Категория услуги" name="serviceCategoryId" required>
                    <SelectSearch options={serviceCategories} />
                </Form.Item>
            </Form>
        </Modal>
    </div>
}