import { DetailRequest } from "../detail-request/detail-request"
import { Dispatch, FC, SetStateAction } from "react"
import { useAppDispatch } from '@shared'
import {FormUpdateRequestValueTypes} from '../../../interfaces'
import { useSelector } from "react-redux"
import {getSelectedRequestForUpdate} from '../../../model/selectors/selectors'
import {updateSelectedRequest} from '../../../model/slices/request-slice'
import {updateRequest} from '../../../model/async-actions/update-request'

export const UpdateRequest:FC<Props> = ({
    setIsModalOpen,
    isModalOpen,
    id
}) => {
    const dispatch = useAppDispatch()
    const handleOk = () => setIsModalOpen(false)

    const initialValues = useSelector(getSelectedRequestForUpdate)
    const onOkHandler = () => {
        dispatch(updateRequest(id))
        handleOk()
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const onChangeHandler = (value: FormUpdateRequestValueTypes) => {
        dispatch(updateSelectedRequest(value))
    }
    return (
        <DetailRequest
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            onOkHandler={onOkHandler}
            onChangeHandler={onChangeHandler}
            request={initialValues}
        />
    )
}

interface Props {
    id: number
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}