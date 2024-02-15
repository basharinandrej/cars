import {useParams} from 'react-router-dom'


const PageOrganization = () => {
    const {id} = useParams()

    return (
        <>
            <h1>zxczxc${id}</h1>
        </>
    )
}

export default PageOrganization