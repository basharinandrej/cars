import {RootState} from '@app'



export const getInformationDetail = (state: RootState) => {
    return {
        id: state.detailInformation.id,
        name: state.detailInformation.name,
        description: state.detailInformation.description,
        price: state.detailInformation.price,
        vendorCode: state.detailInformation.vendorCode,
        wear: state.detailInformation.wear,
        year: state.detailInformation.year,
        photo: state.detailInformation.photo
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