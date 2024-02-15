import {useParams} from 'react-router-dom'
import {OrganizationInformation} from '@features'

const PageOrganization = () => {
    const {id} = useParams()

    return (
        <>
            <OrganizationInformation id={Number(id)}/>
        </>
    )
}

export default PageOrganization