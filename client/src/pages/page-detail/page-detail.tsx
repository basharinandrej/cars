import {useParams} from 'react-router-dom'
import {DetailInformation} from '@features'


const PageDetail = () => {
    const {id} = useParams()

    return (
        <>
            <DetailInformation id={Number(id)}/>
        </>
    )
}

export default PageDetail