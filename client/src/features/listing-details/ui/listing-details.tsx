import React, { useEffect} from 'react'
import { useInView } from 'react-intersection-observer';
import {useSelector} from 'react-redux'
import moment from 'moment'

import { 
    useAppDispatch, 
    useWindowPosition, 
    mapBadge, 
    useMount,
    Card,
    setScrollToDocument
} from '@shared'

import {Detail} from '../interfaces'
import {
    getItemsListingDetails,
    getCanPaginationMoreListingDetails,
    getScrollPositionListingDetails,
    getIsLoadingListingDetails
} from '../model/selectors'

import {keepScrollPosition} from '../model/slices/listing-details-slice'

import {fetchInitialListingDetails} from '../model/async-actions/fetch-initial-listing-details'
import {fetchListingDetailsNextPart} from '../model/async-actions/fetch-listing-details-next-part'

import styles from './listing-details.module.sass'


export const ListingDetails = () => {
    const scrollPosition = useWindowPosition()
    const dispatch = useAppDispatch()

    const details = useSelector(getItemsListingDetails)
    const canPaginationMore = useSelector(getCanPaginationMoreListingDetails)
    const scrollPositionFromStore = useSelector(getScrollPositionListingDetails)
    const isLoading = useSelector(getIsLoadingListingDetails)
    
    const canAutoScroll = (details.length && scrollPositionFromStore)

    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useMount(() => !scrollPositionFromStore && dispatch(fetchInitialListingDetails()))
    useMount(() => canAutoScroll && setScrollToDocument(scrollPositionFromStore))

    useEffect(() => {
        dispatch(keepScrollPosition(scrollPosition))
    }, [scrollPosition])

    useEffect(() => {
        if(inView) {
            canPaginationMore && dispatch(fetchListingDetailsNextPart())
        }
    }, [inView, canPaginationMore, dispatch])


    return <div className={styles.listingDetails}>
        {details?.map((detail: Detail) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color

            return <Card
                loading={isLoading}
                key={detail.id}
                textBadge={textBadge}
                colorBadge={colorBadge}
                to={`detail/${detail.id}`}
                src={`details/${detail.detailPhoto?.url}`}
            >
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>{detail.name}</h3>
                    <p className={styles.price}>Цена: <strong>{detail.price}</strong>&nbsp;p.</p>
                    <p className={styles.date}>{moment(detail.createdAt).format('DD.MM.YYYY')}</p>
                </div>
            </Card>
        })}
        <div ref={ref}/>
    </div>
}


export default ListingDetails
