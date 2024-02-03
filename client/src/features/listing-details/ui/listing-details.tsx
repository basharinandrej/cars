import React, { useEffect, useRef, useCallback } from 'react'
import { Card, Badge } from 'antd'
import {useSelector} from 'react-redux'
import moment from 'moment'

import {useInfinityScroll, useAppDispatch} from '@shared'

import {mapBadge} from './maps/map-badge'
import {Detail} from '../interfaces/interfaces'
import {fetchListingDetails} from '../model/async-actions/fetch-listing-details'
import {fetchListingDetailsNextPart} from '../model/async-actions/fetch-listing-details-next-part'
import {
    getItemsListingDetails,
    getLengthItemsListingDetails,
    getSearchFilterListingDetails
} from '../model/selectors'

import styles from './listing-details.module.sass'


export const ListingDetails = () => {
    const dispatch = useAppDispatch()
    const refRootElement = useRef<HTMLDivElement | null>(null)
    const refTargetElement = useRef<HTMLDivElement | null>(null)

    const details = useSelector(getItemsListingDetails)
    const lengthItems = useSelector(getLengthItemsListingDetails)
    const search = useSelector(getSearchFilterListingDetails)

    useEffect(() => {
        !lengthItems && dispatch(fetchListingDetails())
    }, [])

    const onScrollEndHandler = useCallback(() => {

        !search && lengthItems && dispatch(fetchListingDetailsNextPart())
    },[dispatch, lengthItems, search])

    useInfinityScroll({
        callback: onScrollEndHandler,
        refRootElement,
        refTargetElement
    })


    return <div className={styles.listingDetails} ref={refRootElement} >
        {details?.map((detail: Detail, idx) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color
            return <Badge.Ribbon
                    text={textBadge}
                    color={colorBadge}
                    key={detail.id + idx}
                >
                <Card
                    size={'small'}
                    key={detail.id}
                    className={styles.card}
                    cover={
                        <img
                            className={styles.img}
                            src={`http://localhost:3000/${detail.photo}`}
                        />
                    }
                >
                    <div className={styles.wrapper}>
                        <h3 className={styles.title}>{detail.name}</h3>
                        <p className={styles.price}>Цена: <strong>{detail.price}</strong>&nbsp;p.</p>
                        <p className={styles.date}>{moment(detail.createdAt).format('DD.MM.YYYY')}</p>
                    </div>
                </Card>
            </Badge.Ribbon>
        })}
        <div ref={refTargetElement}/>
    </div>
}


export default ListingDetails
