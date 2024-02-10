import React, {FC, useMemo} from 'react'
import { useSelector } from 'react-redux'
import {
    getInformationDetail, 
    getInformationAboutAuthor
} from '../model/selectors'
import {fetchByIdDetail} from '../model/async-actions/fetch-by-id-detail'
import { useAppDispatch, mapBadge, Button, getIsMobile, getIsTablet, useMount } from '@shared'
import { Badge } from 'antd'

import styles from './detail-information.module.sass'

export const DetailInformation: FC<Props> = ({
    id
}) => {
    const dispatch = useAppDispatch()

    const isMobile = getIsMobile()
    const isTablet = getIsTablet()
    const isDesktop = !isMobile && !isTablet
    
    useMount(() => id && dispatch(fetchByIdDetail(id)))

    const detailInformation = useSelector(getInformationDetail)
    const informationAboutAuthor = useSelector(getInformationAboutAuthor)

    const textBadge = useMemo(() => mapBadge[detailInformation.wear]?.value, [])
    const colorBadge = useMemo(() => mapBadge[detailInformation.wear]?.color, [])

    const renderSide = () => {
        return (
            <div className={styles.side}>
                <p className={styles.price}>{detailInformation.price}&nbsp;P</p>

                <div className={styles.buttonNumber}>
                    <Button 
                        text={informationAboutAuthor.phoneNumber}
                        size={isDesktop ? 'large' : null}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <h1 className={styles.title}>{detailInformation.name}</h1>
                <p className={styles.vendorCode}>Артикул - {detailInformation.vendorCode}</p>
                <span className={styles.wear}>Cостояние -&nbsp;<Badge
                    color={colorBadge}
                    count={textBadge}
                /></span>
                <img
                    className={styles.photo}
                    src={`http://localhost:3000/${detailInformation.photo}`}
                />

                {(isMobile || isTablet) && renderSide()}
                <p>{detailInformation.description}</p>
            </div>

            {isDesktop && renderSide()}
        </div>
    )
}

interface Props {
    id: number
}