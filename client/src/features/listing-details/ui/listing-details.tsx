import React, { useEffect, useRef, useCallback } from 'react'
import { Card, Badge } from 'antd'
import moment from 'moment'
import {mapBadge} from './maps/map-badge'
import {Detail} from '../interfaces/interfaces'
import {PATTERN_DATA} from './constans'
import {fetchListingDetails} from '../model/async-actions/fetch-listing-details'
import {fetchListingDetailsNextPart} from '../model/async-actions/fetch-listing-details-next-part'
import {useSelector} from 'react-redux'
import {
    getItemsListingDetails,
    getTotalListingDetails,
    getLengthItemsListingDetails
} from '../model/selectors'
import {useInfinityScroll, useAppDispatch} from '@shared'
import styles from './listing-details.module.sass'


export const ListingDetails = () => {
    const dispatch = useAppDispatch()
    const refRootElement = useRef<HTMLDivElement | null>(null)
    const refTargetElement = useRef<HTMLDivElement | null>(null)

    const details = useSelector(getItemsListingDetails)
    const total = useSelector(getTotalListingDetails)
    const lengthItem = useSelector(getLengthItemsListingDetails)

    useEffect(() => {
        dispatch(fetchListingDetails())
    }, [])

    const onScrollEndHandler = useCallback(() => {
        console.log('>>> onScrollEndHandler', total, lengthItem)

        if(total <= lengthItem) return

        dispatch(fetchListingDetailsNextPart())
    },[dispatch, total, lengthItem])

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
                        <p className={styles.date}>{moment(detail.createadAt).format(PATTERN_DATA)}</p>
                    </div>
                </Card>
            </Badge.Ribbon>
        })}
        <div ref={refTargetElement}/>
    </div>
}


export default ListingDetails
