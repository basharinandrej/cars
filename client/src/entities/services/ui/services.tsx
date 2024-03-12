import {FC} from 'react'
import { List } from 'antd'
import {IService} from '../interfaces'

import styles from './services.module.sass'



export const Services:FC<Props> = ({
    services
}) => {
    const hasServices = Array.isArray(services) && services.length


    return (hasServices ? <div className={styles.servicesBox}>
            <h2 className={styles.title}>Услуги</h2>
            <List
                size="small"
                dataSource={services}
                renderItem={
                    (service) => <List.Item
                        className={styles.item}
                    >
                        <p>{service.name}</p>
                        <strong>от - {service.price}</strong>
                        <p>{service.description}</p>
                        <p>{service.serviceCategory.name}</p>
                    </List.Item>
                }
            />
        </div>:null)
}

interface Props {
    services: IService[]
}