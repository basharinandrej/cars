import {Brands} from '@entities'
import {FormAddNewBrand} from '@features'

const PageBrands = () => {

    return <>
        <FormAddNewBrand />
        <Brands />
    </>
}

export default PageBrands