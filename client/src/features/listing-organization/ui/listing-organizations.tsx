import { FC, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { Empty } from 'antd';

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

import {AddNewRequest} from '../../add-new-request/ui/add-new-request'
import { Button, AppLink } from '@shared';

import styles from './listing-organizations.module.sass'



export const ListingOrganization = ({
    isCabinet = false
}: Props) => {
    const dispatch = useAppDispatch()
    const [idSelectedOrganization, setIdSelectedOrganization] = useState<number|false>(false);

    const organizations = useSelector(getItemsListingOrganizations)
    const isLoading = useSelector(getIsLoadingListingOrganizations)
    const canPaginationMore = useSelector(getCanPaginationMoreListingOrganization)

    const hasOrganizations = Array.isArray(organizations) && organizations?.length

    useMount(() => dispatch(fetchInitialListingOrganizations()))

    const { ref, inView } = useInView({
        threshold: 1.0,
    });

    useEffect(() => {
        if(inView) {
            canPaginationMore && dispatch(fetchListingOrganizationNextPart())
        }
    }, [inView, canPaginationMore, dispatch])

    const onClickHandler = (id: number) => {
        setIdSelectedOrganization(id)
    }


    const renderButtons = (organizationId: number) => {
        return isCabinet ? (
            <>
                <AppLink to={`/organization/${organizationId}`}>
                    <Button type={'default'} text={'Подробнее'}/> 
                </AppLink>

                <div className={styles.btnWrapper}>
                    <Button type={'primary'} onClick={() => onClickHandler(organizationId)} text={'Забанить'} /> 
                </div>   

                {/* <div className={styles.btnWrapper}>
                    <Button danger type={'primary'} onClick={() => onClickHandler(organizationId)} text={'Удалить'} /> 
                </div>    */}
            </>
        ) : (<>
            <AppLink to={`/organization/${organizationId}`}>
                <Button text={'Подробнее'}/> 
            </AppLink>

            <div className={styles.btnWrapper}>
                <Button onClick={() => onClickHandler(organizationId)} text={'Оставить заявку'} type={'default'}/> 
            </div>   
        </>)
    }

    return (
        hasOrganizations 
            ? <div className={styles.listingOrganizations}>
                <AddNewRequest setIdSelectedOrganization={setIdSelectedOrganization} idSelectedOrganization={idSelectedOrganization} />
                {organizations.map((organization) => {
                    const textBadge = mapBadgeOrganizationStatus[organization.status]?.value
                    const colorBadge = mapBadgeOrganizationStatus[organization.status]?.color
                    const firstAddressOrganization = organization.addresses[0]

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
                                    <p className={styles.address}>{[firstAddressOrganization.city, firstAddressOrganization.street, firstAddressOrganization.house].join(', ')}</p>
                                </div>


                                <div className={styles.boxButtons}>
                                    {renderButtons(organization.id)}
                                </div>
                            </div>
                        </Card>
                    )
                })}
                <div ref={ref}/>
            </div>
            : <Empty description={'Нет автосервисов'}  />
    )
}

interface Props {
    isCabinet?: boolean 
}