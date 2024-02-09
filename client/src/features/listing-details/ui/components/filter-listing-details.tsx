import React, {FC, useEffect, useState} from 'react'
import { FilterTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import {useAppDispatch} from '@shared'
import { Drawer } from 'antd';
import {getIsMobile, getIsTablet} from '@shared';
import {
    initFilters
} from '../../model/slices/filter-listing-details-slice'

import {fetchByIdBrand} from '../../model/async-actions/fetch-by-id-brand'


import {
    getFilterSelectedModelValue,
    getFilterSelectedBrandValue,
    getFilterSelectedBrandLabel
} from '../../model/selectors'


import {SelectSearchCategoryElement} from './select-search-category-element/select-search-category-element'
import {ButtonResetFilter} from './button-reset-filter-element/button-reset-filter-element'
import {SelectSearchModelElement} from './select-search-model-element/select-search-model-element'
import {SelectSearchBrandElement} from './select-search-brand-element/select-search-brand-element'
import {InputSearchGlobalElement} from './input-search-global-element/input-search-global-element'

import styles from './filter-listing-details.module.sass'


export const FilterListingDetails: FC<Props> = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);

    const isMobile = getIsMobile()
    const isTablet = getIsTablet()


    useEffect(() => {
        dispatch(initFilters())
    }, [])
    
    const modelValue = useSelector(getFilterSelectedModelValue)
    const brandLabel = useSelector(getFilterSelectedBrandLabel)
    const brandValue = useSelector(getFilterSelectedBrandValue)

    useEffect(() => {
        if(brandValue && !brandLabel) {
            dispatch(fetchByIdBrand(brandValue))
        }
    }, [modelValue, brandValue])

    const onClickFilter = () => setOpen(true)
    const closeDrawerHandler = () => setOpen(false)

    const suffixSearchInput = (isMobile || isTablet) && <FilterTwoTone onClick={onClickFilter} />

    const renderFilterControls = () => (
        <>
            <div className={styles.boxSelects}>
                <div className={styles.selectSearchBrand}>
                    <SelectSearchBrandElement />
                </div>

                <div className={styles.selectSearchModel}>
                    <SelectSearchModelElement />
                </div>

                <div className={styles.selectSearchCategory}>
                    <SelectSearchCategoryElement />
                </div>
            </div>
            <div className={styles.buttonResetFilter}>
                <ButtonResetFilter />
            </div>
        </>
    )

    const renderFilterControlsForMobile = () => {
        return (
            <Drawer
                title="Фильтр" 
                onClose={closeDrawerHandler} 
                open={open}
            >
                {renderFilterControls()}
            </Drawer>
        )
    }

    const renderFilterControlsForDesktop = () => renderFilterControls()

    return <div className={styles.filterWrapper}>
        <div className={styles.inputSearch}>
            <InputSearchGlobalElement suffix={suffixSearchInput} />
        </div>

       {(isMobile || isTablet) ? renderFilterControlsForMobile() : renderFilterControlsForDesktop()}
    </div>
}

interface Props {

}