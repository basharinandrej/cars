import {Select, StatusOrganization, useAppDispatch, useMount} from '@shared'
import {useSelector} from 'react-redux'

import {
    getStatusFilterListingOrganization, 
    getOptionsFilterListingOrganization
} from '../../../model/selectors'

import {
    setStatusOrganization,
    dropStatusOrganization,
    initFilters
} from '../../../model/slices/filter-listing-organization-slice'

import {fetchInitialListingOrganizations} from '../../../model/async-actions/fetch-initial-listing-organizations'

import {SelectServiceCategoryElement} from '../../components/filter-organization-listing/components/select-service-category-element/select-service-category-element'

import styles from './filter-organization-listing.module.sass'



export const FilterOrganizationListing = () => {
    const dispatch = useAppDispatch()

    const status = useSelector(getStatusFilterListingOrganization)
    const options = useSelector(getOptionsFilterListingOrganization)

    useMount(() => dispatch(initFilters()))

    const onChangeHandler = (value: StatusOrganization) => {
        value && dispatch(setStatusOrganization(value))
        dispatch(fetchInitialListingOrganizations())
    }
    const onClearHandler = () => {
        dispatch(dropStatusOrganization())
    }
    return (
        <div className={styles.filter}>
            <div className={styles.selectStatus}>
                <Select
                    onChange={onChangeHandler}
                    onClear={onClearHandler}
                    options={options}
                    value={status}
                    placeholder='Выбрать свободный сервис'
                />
            </div>

            <div className={styles.selectorServiceCategory}>
                <SelectServiceCategoryElement />
            </div>
        </div>
    )
}