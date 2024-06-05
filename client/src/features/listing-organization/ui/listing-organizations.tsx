import { useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { useInView } from 'react-intersection-observer'
import { Empty } from 'antd';

import { 
    useAppDispatch, 
    mapBadgeOrganizationStatus,
    Card,
    useMount,
    Bans,
    mapBadgeOrganizationBans
} from '@shared'

import {fetchInitialListingOrganizations} from '../model/async-actions/fetch-initial-listing-organizations'
import {fetchListingOrganizationNextPart} from '../model/async-actions/fetch-listing-organization-next-part'
import {setBanOrganization} from '../model/async-actions/set-ban-organization'

import {
    getItemsListingOrganizations,
    getIsLoadingListingOrganizations,
    getCanPaginationMoreListingOrganization
} from '../model/selectors'

import {AddNewRequest} from '../../add-new-request/ui/add-new-request'
import { Button, AppLink } from '@shared';

import styles from './listing-organizations.module.sass'
import { Organization } from '../interfaces';
import { deleteBanOrganization } from '../model/async-actions/delete-ban-organization';



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

    const onClickHandler = (organizationId: number) => {
        setIdSelectedOrganization(organizationId)
    }
    const onSendBanOrganizationHandler = (organizationId: number, ban: Bans) => {
        ban === Bans.Null 
            ? dispatch(setBanOrganization(organizationId))
            : dispatch(deleteBanOrganization(organizationId))
    }


    const renderButtons = (organizationId: number, ban: Bans) => {
        return isCabinet ? (
            <>
                <AppLink to={`/organization/${organizationId}`}>
                    <Button type={'default'} text={'Подробнее'}/> 
                </AppLink>

                <div className={styles.btnWrapper}>
                    <Button type={'primary'} 
                        onClick={() => onSendBanOrganizationHandler(organizationId, ban)} 
                        text={ban === Bans.Null ?  'Забанить' : 'Снять бан'} 
                    /> 
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


    const getTextBadge = (organization: Organization) => {
        return isCabinet ? mapBadgeOrganizationBans[organization.ban]?.value : mapBadgeOrganizationStatus[organization.status]?.value
    }

    const getColorBadge = (organization: Organization) => {
        return isCabinet ? mapBadgeOrganizationBans[organization.ban]?.color : mapBadgeOrganizationStatus[organization.status]?.color
    }

    return (
        hasOrganizations 
            ? <div className={styles.listingOrganizations}>
                <AddNewRequest setIdSelectedOrganization={setIdSelectedOrganization} idSelectedOrganization={idSelectedOrganization} />
                {organizations.map((organization) => {
                    const textBadge = getTextBadge(organization)
                    const colorBadge = getColorBadge(organization)
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
                                    {renderButtons(organization.id, organization.ban)}
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