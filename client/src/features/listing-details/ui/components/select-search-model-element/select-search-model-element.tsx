import {useAppDispatch, SelectSearch} from '@shared'
import { useSelector } from 'react-redux';


import {
    setSelectedModel,
    dropSelectedModel,
} from '../../../model/slices/filter-listing-details-slice'


import {fetchInitialListingDetails} from '../../../model/async-actions/fetch-initial-listing-details'
import {fetchListingModels} from '../../../model/async-actions/fetch-listing-models'


import { 
    getFilterSelectedModelLabel,
    getFilterListingModels
} from '../../../model/selectors'



export const SelectSearchModelElement = () => {
    const dispatch = useAppDispatch()

    const models = useSelector(getFilterListingModels)
    const modelLabel = useSelector(getFilterSelectedModelLabel)


    const onFocusModelHandler = () => {
        dispatch(fetchListingModels())
    };
    const onChangeSelectModelHandler = (value: string) => {
        if(value) {
            dispatch(setSelectedModel(Number(value)))
            dispatch(fetchInitialListingDetails())
        }
    };
    const onClearSelectModelHandler = () => {
        dispatch(dropSelectedModel())
        dispatch(fetchInitialListingDetails())
    }

    return (
        <SelectSearch
            placeholder={'Выбирите модель'}
            onFocus={onFocusModelHandler}
            onChange={onChangeSelectModelHandler}
            onClear={onClearSelectModelHandler}
            options={models}
            value={modelLabel}
        />
    )
}