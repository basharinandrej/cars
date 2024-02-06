import {addQueryParams} from './add-query-params'

export const dropQuerySearch = () => addQueryParams({keyword: ''})
export const dropQueryModelId = () => addQueryParams({modelId: ''})