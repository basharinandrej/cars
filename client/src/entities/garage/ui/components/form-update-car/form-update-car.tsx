import { FormCar } from "../form-car/form-car"
import {FormAddNewCarValueTypes} from '../../../interfaces'
import { Dispatch, FC, SetStateAction, useEffect } from "react"
import { useSelector } from "react-redux"
import {getSelectedCarForUpdate} from '../../../model/selectors'
import {updateSelectedCar} from '../../../model/slices/car-slice'
import {useAppDispatch} from '@shared'
import {updateCarUser} from '../../../model/async-actions/update-car-user'


export const FormUpdateCar:FC<Props> = ({
    isModalOpen,
    setIsModalOpen
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const seletedCar = useSelector(getSelectedCarForUpdate)


    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewCarValueTypes) => {
        dispatch(updateSelectedCar(value))
    }
    const onOkHandler = () => {
        dispatch(updateCarUser())
        handleOk()
    }

    return <FormCar                
                title="Редактировать машину"
                isModalOpen={isModalOpen} 
                handleCancel={handleCancel}
                onChangeHandler={onChangeHandler}
                onOkHandler={onOkHandler}
                nameForm="Update"
                initialValues={seletedCar}
                okText='Редактировать'
            />
}

interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}