import { FormCar } from "../form-car/form-car"
import {FormAddNewCarValueTypes} from '../../../interfaces'
import { Dispatch, FC, SetStateAction } from "react"
import { useSelector } from "react-redux"
import {getSelectedCarForUpdate} from '../../../model/selectors'

export const FormUpdateCar:FC<Props> = ({
    isModalOpen,
    setIsModalOpen
}) => {

    const seletedCar = useSelector(getSelectedCarForUpdate)
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormAddNewCarValueTypes) => {

    }
    const onOkHandler = () => {

    }

    return <FormCar                
                title="Редактировать машину"
                isModalOpen={isModalOpen} 
                handleCancel={handleCancel}
                onChangeHandler={onChangeHandler}
                onOkHandler={onOkHandler}
                nameForm="Update"
                initialValues={seletedCar}
            />
}

interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}