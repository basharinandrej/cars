import {RootState} from '@app'

export const getCarData = (state: RootState) => state.addNewCar.car
export const getIsLoading = (state: RootState) => state.addNewCar.isLoading
export const getError = (state: RootState) => state.addNewCar.error