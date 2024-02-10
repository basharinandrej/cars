import {CommonListing} from '@shared'

export function calcOffset<T extends CommonListing>(state: T) {
    const newOffset = state.offset + state.limit
    return newOffset > state.total ? state.total : newOffset
}