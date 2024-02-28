import {RootState} from '@app'
import {createSelector} from "@reduxjs/toolkit";



export const getInformationDetail = (state: RootState) => {
    return {
        id: state.detailInformation.id,
        name: state.detailInformation.name,
        description: state.detailInformation.description,
        price: state.detailInformation.price,
        vendorCode: state.detailInformation.vendorCode,
        wear: state.detailInformation.wear,
        year: state.detailInformation.year,
        detailPhoto: state.detailInformation.detailPhoto
    }
}

const getInformationProfile = (state: RootState) => {
    return {
        id: state.profile.user.id
    }
}


export const getInformationAboutAuthor = (state: RootState) => {
    return {
        id: state.detailInformation.user.id,
        name: state.detailInformation.user.name,
        phoneNumber: state.detailInformation.user.phoneNumber,
        surname: state.detailInformation.user.surname,
    }
}


export const getIsMyDetail = createSelector(
    getInformationProfile,
    getInformationAboutAuthor,
    (profileInformation, informationAboutAuthor) => {
        return profileInformation.id === informationAboutAuthor.id
    }
)
