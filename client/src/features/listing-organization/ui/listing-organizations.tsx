import React, { useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useInView } from 'react-intersection-observer'

import { 
    useAppDispatch, 
    mapBadgeOrganizationStatus,
    Card,
    useMount
} from '@shared'

import {fetchInitialListingOrganizations} from '../model/async-actions/fetch-initial-listing-organizations'
import {fetchListingOrganizationNextPart} from '../model/async-actions/fetch-listing-organization-next-part'

import {
    getItemsListingOrganizations,
    getIsLoadingListingOrganizations,
    getCanPaginationMoreListingOrganization
} from '../model/selectors'

import { Button, AppLink } from '@shared';

import styles from './listing-organizations.module.sass'



export const ListingOrganization = () => {
    const dispatch = useAppDispatch()

    const organizations = useSelector(getItemsListingOrganizations)
    const isLoading = useSelector(getIsLoadingListingOrganizations)
    const canPaginationMore = useSelector(getCanPaginationMoreListingOrganization)

    useMount(() => dispatch(fetchInitialListingOrganizations()))

    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useEffect(() => {
        if(inView) {
            canPaginationMore && dispatch(fetchListingOrganizationNextPart())
        }
    }, [inView, canPaginationMore, dispatch])

    return (
        <div className={styles.listingOrganizations}>
            {organizations.map((organization) => {
                const textBadge = mapBadgeOrganizationStatus[organization.status]?.value
                const colorBadge = mapBadgeOrganizationStatus[organization.status]?.color

                return (
                    <Card
                        key={organization.id}
                        loading={isLoading}
                        type='row'
                        textBadge={textBadge}
                        colorBadge={colorBadge}
                        src={organization.avatar}
                    >
                        <div className={styles.wrapper}>
                            <div className={styles.information}>
                                <h3 className={styles.title}>{organization.name}</h3>
                            </div>


                            <div className={styles.boxButton}>
                                <AppLink to={`organizations/${organization.id}`}>
                                    <Button text={'Подробнее'}/> 
                                </AppLink>
                                <Button text={'Оставить заявку'} type={'default'}/> 
                            </div>

                        </div>
                    </Card>
                )
            })}
            <div ref={ref}/>
        </div>
    )
}