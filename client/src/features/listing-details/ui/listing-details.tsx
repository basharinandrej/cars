import {FC, useEffect} from 'react'
import { useInView } from 'react-intersection-observer';
import {useSelector} from 'react-redux'
import { Empty } from 'antd';

import { 
    useAppDispatch, 
    useWindowPosition, 
    mapBadge, 
    useMount,
    setScrollToDocument
} from '@shared'

import {IDetail, DetailCard} from '@entities'
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


export const ListingDetails:FC<Props> = ({id}) => {
    const scrollPosition = useWindowPosition()
    const dispatch = useAppDispatch()

    const details = useSelector(getItemsListingDetails)
    const canPaginationMore = useSelector(getCanPaginationMoreListingDetails)
    const scrollPositionFromStore = useSelector(getScrollPositionListingDetails)
    const isLoading = useSelector(getIsLoadingListingDetails)
    
    const canAutoScroll = (details?.length && scrollPositionFromStore)
    const hasDetails = Array.isArray(details) && details?.length

    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useMount(() => !scrollPositionFromStore && dispatch(fetchInitialListingDetails(id)))
    useMount(() => canAutoScroll && setScrollToDocument(scrollPositionFromStore))

    useEffect(() => {
        dispatch(keepScrollPosition(scrollPosition))
    }, [scrollPosition])

    useEffect(() => {
        if(inView) {
            canPaginationMore && dispatch(fetchListingDetailsNextPart(id))
        }
    }, [inView, canPaginationMore, dispatch])


    return hasDetails 
            ? <div className={styles.listingDetails}>
                {details?.map((detail: IDetail) => {
                    const textBadge = mapBadge[detail.wear].value
                    const colorBadge = mapBadge[detail.wear].color

                    return <DetailCard 
                            key={detail.id}
                            textBadge={textBadge}
                            colorBadge={colorBadge}
                            isLoading={isLoading}
                            detail={detail}
                            href={`/detail/${detail.id}`}
                            photoUrl={`details/${detail.detailPhoto[0]?.url}`}
                        />
                })}
                <div ref={ref}/>
            </div>
            : <Empty description={'Нет деталей'} />
}


export default ListingDetails


interface Props{
    id?: number
}