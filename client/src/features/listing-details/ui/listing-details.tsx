import { useEffect, useRef, useCallback } from 'react';
import { Card, Badge } from 'antd';
import moment from 'moment'
import {mapBadge} from './maps/map-badge'
import {Detail} from '../interfaces/interfaces'
import {PATTERN_DATA} from './constans'
import {fetchListingDetails} from '../model/async-actions/fetch-listing-details'
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux'
import {getItemsListingDetails} from '../model/selectors'
import {AppDispatch} from '../../../app/providers'
import {useInfinityScroll} from '../../../shared'
import styles from './listing-details.module.sass'

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const ListingDetails = () => {
    const dispatch = useAppDispatch()
    const refRootElement = useRef<HTMLDivElement | null>(null)
    const refTargetElement = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        dispatch(fetchListingDetails())
    }, [])

    const onScrollEndHandler = useCallback(() => {

        console.log('>>> onScrollEndHandler')
    },[dispatch])

    useInfinityScroll({
        callback: onScrollEndHandler,
        refRootElement,
        refTargetElement
      })

    const details = useSelector(getItemsListingDetails)

    return <div className={styles.listingDetails} ref={refRootElement} >
        {details?.map((detail: Detail) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color

            return <Badge.Ribbon text={textBadge} color={colorBadge}>
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