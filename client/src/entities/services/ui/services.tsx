import {FC} from 'react'
import { List } from 'antd'
import {IService} from '../interfaces'
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, Button} from '@shared'
import {deleteService} from '../model/async-actions/delete-service'
import styles from './services.module.sass'
import classNames from 'classnames'



export const Services:FC<Props> = ({
    services,
    isFullContainer = false,
    isShowDelete = false
}) => {
    const hasServices = Array.isArray(services) && services.length
    const dispatch = useAppDispatch()

    const onClickDeleteHandler = (idService: number) => {
        dispatch(deleteService(idService))
    }
    return (hasServices ? <div className={classNames(styles.servicesBox, styles.scroll, {
        [styles.servicesBoxFull]: isFullContainer
    })}>
            <h2 className={styles.title}>Услуги</h2>
            <List
                size="small"
                dataSource={services}
                renderItem={
                    (service) => <List.Item
                        className={classNames({
                            [styles.itemWithButtom]: isShowDelete,
                            [styles.item]: !isShowDelete,
                        })}
                    >
                        <p>{service.name}</p>
                        <strong>от - {service.price}</strong>
                        <p>{service.description}</p>
                        {service.serviceCategory?.name && <p>{service.serviceCategory?.name}</p>}

                        {isShowDelete && <div className={styles.boxButtons}>
                            <div className={styles.buttonDelete}>
                                <Button icon={<DeleteOutlined />} onClick={()=>onClickDeleteHandler(service.id)} danger />
                            </div>
                        </div>}
                    </List.Item>
                }
            />
        </div>:null)
}

interface Props {
    services: IService[]
    isFullContainer?: boolean
    isShowDelete?: boolean
}