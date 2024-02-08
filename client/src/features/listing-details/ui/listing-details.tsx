import React, { useEffect, useRef, useCallback} from 'react'
import { Card, Badge } from 'antd'
import {useSelector} from 'react-redux'
import moment from 'moment'

import {useInfinityScroll, useAppDispatch, AppLink, useDebounce, HTMLElementEvent} from '@shared'

import {mapBadge} from './maps/map-badge'
import {Detail} from '../interfaces'
import {
    getItemsListingDetails,
    getCanPaginationMoreListingDetails,
    getScrollPositionListingDetails
} from '../model/selectors'

import {keepScrollPosition} from '../model/slices/listing-details-slice'

import {fetchInitialListingDetails} from '../model/async-actions/fetch-initial-listing-details'
import {fetchListingDetailsNextPart} from '../model/async-actions/fetch-listing-details-next-part'

import styles from './listing-details.module.sass'


export const ListingDetails = () => {
    const dispatch = useAppDispatch()
    const refRootElement = useRef<HTMLDivElement | null>(null)
    const refTargetElement = useRef<HTMLDivElement | null>(null)

    const details = useSelector(getItemsListingDetails)
    const canPaginationMore = useSelector(getCanPaginationMoreListingDetails)
    const scrollPosition = useSelector(getScrollPositionListingDetails)
        
    useEffect(() => {
        if(details.length && scrollPosition && refRootElement.current) {
            refRootElement.current.scrollTo({
                top: scrollPosition,
                behavior: 'auto'
            })
        }
    }, [refRootElement, details])

    useEffect(() => {
        !scrollPosition && dispatch(fetchInitialListingDetails())
    }, [])

    const onScrollEndHandler = useCallback(() => {
        canPaginationMore && dispatch(fetchListingDetailsNextPart())
    }, [canPaginationMore, dispatch, fetchListingDetailsNextPart])

    const onScrollHandler  = useDebounce((e: HTMLElementEvent<HTMLDivElement>) => {
        const value = e.target?.scrollTop

        dispatch(keepScrollPosition(value))
    }, 300)

    useInfinityScroll({
        callback: onScrollEndHandler,
        refRootElement,
        refTargetElement
    })


    return <div 
        onScroll={onScrollHandler}
        className={styles.listingDetails} 
        ref={refRootElement} 
        >
        {details?.map((detail: Detail) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color

            return <AppLink key={detail.id} to={`detail/${detail.vendorCode}`}>
                <Badge.Ribbon
                    text={textBadge}
                    color={colorBadge}
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
            </AppLink>
        })}
        <div ref={refTargetElement}/>
    </div>
}


export default ListingDetails
