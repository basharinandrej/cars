import {CategoryServices} from '@entities'
import {FormNewCategoryService} from '@features'

const PageCategoryServices = () => {

    return <>
        <FormNewCategoryService />
        <CategoryServices />
    </>
}

export default PageCategoryServices