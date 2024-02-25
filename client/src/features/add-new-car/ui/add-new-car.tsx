import {Button, useAppDispatch} from '@shared'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { setCar } from '../model/slices/add-new-car-slice'
import {addNewCar} from '../model/async-actions/add-new-car'
import {getIsLoading, getError, getCarData} from '../model/selectors'
import {FormAddNewCarValueTypes, FormCar} from '@entities'
import moment from 'moment'


import styles from './add-new-car.module.sass'


export const AddNewCard = () => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => setIsModalOpen(false)
    const handleCancel = () => setIsModalOpen(false)

    const isLoading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const car = useSelector(getCarData)

    useEffect(() => {
        !isLoading && !error && handleOk()
    }, [isLoading, error])

    const onChangeHandler = (value: FormAddNewCarValueTypes) => {
        dispatch(setCar(value))
    }

    const onOkHandler = () => {
        dispatch(addNewCar())
    }

    return (
        <div>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>

            <FormCar
                handleCancel={handleCancel}
                isModalOpen={isModalOpen}
                onChangeHandler={onChangeHandler}
                onOkHandler={onOkHandler}
                title="Добавить машину"
                nameForm="Create"
                initialValues={car}
            />
        </div>
    )
}