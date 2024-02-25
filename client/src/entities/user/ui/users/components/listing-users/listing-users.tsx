import { useSelector } from "react-redux"
import { getUsers } from "../../../../model/selectors"
import { Button, useAppDispatch, useMount } from "@shared"
import { featchUsers } from "../../../../model/async-actions/fetch-users"
import { Empty, List } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import styles from './listing-users.module.sass'

const header = (
    <div className={styles.header}>
        <p>ID</p>
        <p>Имя</p>
        <p>Фамилия</p>
        <p>Email</p>
        <p>Роль</p>
        <p>Бан</p>
        <div className={styles.headButton} />
    </div>
)

export const ListingUsers = () => {
    const dispatch = useAppDispatch()
    const users = useSelector(getUsers)
    useMount(() => {
        dispatch(featchUsers())
    })

    console.log('>> users', users)

    const onClickEditHandler = (id: number) => {}
    const onClickDeleteHandler = (id: number) => {}
    return <>
        {users.length
            ? <div className={styles.scroll}>
                <List
                    header={header}
                    size="small"
                    dataSource={users}
                    className={styles.list}
                    renderItem={
                        (user) => <List.Item className={styles.item}>
                            <p>{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.surname}</p>
                            <p>{user.email}</p>
                            <p>{user.role}</p>
                            <p>{user.ban}</p>

                            <div className={styles.boxButtons}>
                                <div className={styles.buttonEdit}>
                                    <Button icon={<EditOutlined />} onClick={() => onClickEditHandler(user.id)} />
                                </div>
                                <div className={styles.buttonDelete}>
                                    <Button icon={<DeleteOutlined />} onClick={() => onClickDeleteHandler(user.id)} danger />
                                </div>
                            </div>
                        </List.Item>
                    }
                />
            </div>
            : <Empty description={'Нет пользователей'} />}
    </>
}