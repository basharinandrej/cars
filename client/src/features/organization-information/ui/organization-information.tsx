import {FC} from 'react'
import { 
    useMount, 
    useAppDispatch,
    mapBadgeOrganizationStatus,
    APP_SERVER_URL
} from '@shared'
import { useSelector } from 'react-redux'

import {fetchByIdOrganization} from '../model/async-actions/fetch-by-id-organization'

import {
    getInfoOrganization,
    getAddressesOrganization,
    getServicesOrganization
} from '../model/selectors'

import { Badge, List } from 'antd'
import styles from './organization-information.module.sass'


export const OrganizationInformation: FC<Props> = ({
    id
}) => {
    const dispatch = useAppDispatch()

    useMount(() => {
        dispatch(fetchByIdOrganization(id))
    })

    const detailInformation = useSelector(getInfoOrganization)
    const addresses = useSelector(getAddressesOrganization)
    const services = useSelector(getServicesOrganization)

    const hasServices = Array.isArray(services) && services.length


    const textBadge = mapBadgeOrganizationStatus[detailInformation.status]?.value
    const colorBadge = mapBadgeOrganizationStatus[detailInformation.status]?.color
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <img
                    className={styles.img}
                    src={`${APP_SERVER_URL}/${detailInformation.avatar}`} 
                    alt="avatar-organization" 
                />
                <h1 className={styles.title}>{detailInformation.name}</h1>
            </div>


            <span className={styles.wear}>Cостояние -&nbsp;<Badge
                color={colorBadge}
                count={textBadge}
                />
            </span>
            <p className={styles.phoneNumber}>Телефон - {detailInformation.phoneNumber}</p>


            {hasServices ? <div className={styles.servicesBox}>
                <h2 className={styles.title}>Услуги</h2>
                <List
                    size="small"
                    dataSource={services}
                    renderItem={
                        (service) => <List.Item
                            className={styles.item}
                        >
                            <p>{service.name}</p> <strong>от - {service.price}</strong>
                        </List.Item>
                    }
                />
            </div>:null}
        </div>
    )
}

interface Props {
    id: number
}