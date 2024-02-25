import {RootState} from '@app'

export const getItems = (state: RootState) => state.cars.items
export const getSelectedCarForUpdate = (state: RootState) => state.cars.selectedCarForUpdate