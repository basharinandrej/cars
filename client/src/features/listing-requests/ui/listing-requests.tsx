import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons';
import { getRequestsItems, getIsUser, getIsOrganization } from '../model/selectors/selectors';
import { fetchRequests } from '../model/async-actions/fetch-requests';
import { statusMap } from '../dictonaries/status-map'
import {UpdateRequest} from '../ui/components/update-request/update-request'
import {selectedRequestForUpdate} from '../model/slices/request-slice'


import styles from './listing-requests.module.sass'


const getHeader = (isUser: boolean, isOrganization: boolean) => (
    <div className={styles.header}>
        <p>ID</p>
        <p>Статус</p>
        {isUser ? <p>Название организации</p> : ''}
        {isOrganization ? <p>Имя пользователя</p> : ''}
        <div className={styles.headButton} />
    </div>
)
export const RequestsLisintg:FC<Props> = ({
    id
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useAppDispatch()
    const requests = useSelector(getRequestsItems)
    const isUser = Boolean(useSelector(getIsUser))
    const isOrganization = Boolean(useSelector(getIsOrganization))

    useMount(() => {
        dispatch(fetchRequests({id, isUser}))
    })

    const onClickEditHandler = (id: number) => {
        setIsModalOpen(true)
        dispatch(selectedRequestForUpdate(id))
    }

    return (
        <>
            <h2 className={styles.title}>Мои заявки</h2>
            <UpdateRequest 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                id={id}
            />

            {requests.length 
                ? <div className={styles.scroll}>
                    <List
                        header={getHeader(isUser, isOrganization)}
                        size="small"
                        dataSource={requests}
                        className={styles.list}
                        renderItem={
                            (request) => <List.Item className={styles.item}>
                                <p>{request.id}</p>
                                <p>{statusMap[request.status]}</p>
                                {isUser? <p>{request.organizaiton.name}</p> : ''}
                                {isOrganization ? <p>{request.user.name}</p> : ''}
                                <div className={styles.boxButtons}>
                                    <div className={styles.buttonEdit}>
                                        <Button icon={<EditOutlined />} onClick={()=> onClickEditHandler(request.id)} />
                                    </div>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : <Empty description={'Нет заявок'} />}
        </>
    )
}

interface Props {
    id: number
}