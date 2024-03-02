import {FC} from 'react'
import { useAppDispatch, useMount} from '@shared'
import { Empty, List } from 'antd'
import { useSelector } from 'react-redux'
import { getRequestsItems, getIsUser } from '../model/selectors/selectors';
import { fetchRequests } from '../model/async-actions/fetch-requests';

import styles from './listing-requests.module.sass'


const getHeader = (isUser: boolean) => (
    <div className={styles.header}>
        <p>ID</p>
        <p>Статус</p>
        <p>Название организации</p>
        {isUser ? '' : <p>Имя пользователя</p>}
    </div>
)
export const RequestsLisintg:FC<Props> = ({
    id
}) => {

    const dispatch = useAppDispatch()
    const requests = useSelector(getRequestsItems)
    const isUser = Boolean(useSelector(getIsUser))

    useMount(() => {
        dispatch(fetchRequests(id))
    })

    return (
        <>
            <h2 className={styles.title}>Мои заявки</h2>
            
            {requests.length 
                ? <div className={styles.scroll}>
                    <List
                        header={getHeader(isUser)}
                        size="small"
                        dataSource={requests}
                        className={styles.list}
                        renderItem={
                            (request) => <List.Item className={styles.item}>
                                <p>{request.id}</p>
                                <p>{request.status}</p>
                                <p>{request.organizaiton.name}</p>
                                {isUser ? '' : <p>{request.user.name}</p>}
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