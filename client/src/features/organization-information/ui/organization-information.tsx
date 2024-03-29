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

import {Services} from '@entities'
import { Badge } from 'antd'
import { Map, FullscreenControl } from '@pbe/react-yandex-maps'

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


            <span className={styles.wear}>Статус -&nbsp;<Badge
                color={colorBadge}
                count={textBadge}
                />
            </span>
            <p className={styles.phoneNumber}>Телефон - {detailInformation.phoneNumber}</p>


            <Services services={services} />

            <Map
                className={styles.map}
                defaultState={{ center: [59.2239, 39.884], zoom: 11 }} 
            >
                <FullscreenControl />
                {/* <GeoObject 
                    geometry={{ type: "Point", coordinates: [59.2239, 39.884] }}
                /> */}
            </Map>
        </div>
    )
}

interface Props {
    id: number
}