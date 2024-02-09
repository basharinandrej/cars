import React, {useEffect} from 'react'
import { Card, Badge } from 'antd'
import {useSelector} from 'react-redux'

import { useAppDispatch, mapBadgeOrganizationStatus, AppLink, } from '@shared'
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
                    <AppLink key={organization.id} to={`/organization/${organization.id}`}>
                        <Badge.Ribbon
                            placement='start'
                            text={textBadge}
                            color={colorBadge}
                        >
                        <Card
                            size={'small'}
                            className={styles.card}
                            
                            cover={
                                <img
                                    className={styles.img}
                                    src={`http://localhost:3000/${organization.avatar}`}
                                />
                            }
                        >
                            <div className={styles.wrapper}>
                                <h3 className={styles.title}>{organization.name}</h3>
                            </div>
                        </Card>
                    </Badge.Ribbon>
                </AppLink>
                )
            })}
        </div>
    )
}