import { FormCar } from "../form-car/form-car"
import {FormAddNewCarValueTypes} from '../../../interfaces'
import { Dispatch, FC, SetStateAction } from "react"


export const FormUpdateCar:FC<Props> = ({
    isModalOpen,
    setIsModalOpen
}) => {

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
            />
}

interface Props {
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}