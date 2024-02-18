import {useMemo, useState} from 'react'
import {useAppDispatch, useMount, getIsMobile, getIsTablet} from '@shared'
import { Drawer } from 'antd';
import { FilterTwoTone } from '@ant-design/icons'

import {SelectServiceCategoryElement} from '../../components/filter-organization-listing/components/select-service-category-element/select-service-category-element'
import {SelectStatusElement} from '../../components/filter-organization-listing/components/select-status-element/select-status-element'
import {initFilters} from '../../../model/slices/filter-listing-organization-slice'
import { ButtonResetFilter } from './components/button-reset-filter-component/button-reset-filter-component';

import styles from './filter-organization-listing.module.sass'



export const FilterOrganizationListing = () => {
    const dispatch = useAppDispatch()
    const [openDrawer, setOpenDrawer] = useState(false);

    const isMobile = getIsMobile()
    const isTablet = getIsTablet()

    useMount(() => dispatch(initFilters()))

    const openFilters = () => setOpenDrawer(true)
    const closeDrawerHandler = () => setOpenDrawer(false)

    const renderFilterControls = useMemo(()=> (
        <>
            <div className={styles.boxSelects}>
                <div className={styles.selectStatus}>
                    <SelectStatusElement />
                </div>

                <div className={styles.selectorServiceCategory}>
                    <SelectServiceCategoryElement />
                </div>
            </div>

            <div className={styles.buttonResetFilter}>
                <ButtonResetFilter />
            </div>
        </>
    ), [])

    const renderFilterControlsForMobile = () => {
        return (
            <Drawer
                title="Фильтр" 
                onClose={closeDrawerHandler} 
                open={openDrawer}
            >
                {renderFilterControls}
            </Drawer>
        )
    }
    const renderFilterControlsForDesktop = () => renderFilterControls

    return <div className={styles.filterWrapper}>
        {(isMobile || isTablet) && <div onClick={openFilters} className={styles.filterText} >
            <p className={styles.text}>Фильтры</p>
            <FilterTwoTone />    
        </div>}
        {(isMobile || isTablet) ? renderFilterControlsForMobile() : renderFilterControlsForDesktop()}
    </div>

}