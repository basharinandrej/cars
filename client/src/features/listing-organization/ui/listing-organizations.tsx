import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

import { 
    useAppDispatch, 
    mapBadgeOrganizationStatus,
    Card
} from '@shared'
import {fetchInitialListingOrganizations} from '../model/async-actions/fetch-initial-listing-organizations'
import {getItemsListingOrganizations} from '../model/selectors'

import styles from './listing-organizations.module.sass'

export const ListingOrganization = () => {
    const dispatch = useAppDispatch()
    const organizations = useSelector(getItemsListingOrganizations)

    useEffect(() => {
        dispatch(fetchInitialListingOrganizations())
    }, [])


    return (
        <div className={styles.listingOrganizations}>
            {organizations.map((organization) => {
                const textBadge = mapBadgeOrganizationStatus[organization.status].value
                const colorBadge = mapBadgeOrganizationStatus[organization.status].color

                return (
                    <Card
                        loading={false}
                        type='row'
                        textBadge={textBadge}
                        colorBadge={colorBadge}
                        src={organization.avatar}
                    >
                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{organization.name}</h3>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}