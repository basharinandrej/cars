import React, { useEffect} from 'react'
import { Card, Badge } from 'antd'
import { useInView } from 'react-intersection-observer';
import {useSelector} from 'react-redux'
import moment from 'moment'

import { useAppDispatch, AppLink, useDebounce, useWindowPosition, mapBadge} from '@shared'

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
    const scroll = useWindowPosition()
    const dispatch = useAppDispatch()

    const details = useSelector(getItemsListingDetails)
    const canPaginationMore = useSelector(getCanPaginationMoreListingDetails)
    const scrollPosition = useSelector(getScrollPositionListingDetails)
    
    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useEffect(() => {
        if(details.length && scrollPosition) {
            document.documentElement.scrollTo({
                top: scrollPosition,
                behavior: 'auto'
            })
        }
    }, [details])

    useEffect(() => {
        !scrollPosition && dispatch(fetchInitialListingDetails())
    }, [])

    const debounceKeepSccrollPosition = useDebounce(() => dispatch(keepScrollPosition(scroll)), 300)

    useEffect(() => {
        return () => debounceKeepSccrollPosition()
    }, [scroll])

    useEffect(() => {
        if(inView) {
            canPaginationMore && dispatch(fetchListingDetailsNextPart())
        }
    }, [inView, canPaginationMore, dispatch])


    return <div className={styles.listingDetails}>
        {details?.map((detail: Detail) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color

            return <AppLink key={detail.id} to={`detail/${detail.id}`}>
                <Badge.Ribbon
                    placement='start'
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
        <div ref={ref}/>
    </div>
}


export default ListingDetails
