import {useParams} from 'react-router-dom'


const PageCabinet = () => {
    const {id} = useParams()

    return (
        <>
            <h1>PageCabinet </h1>
        </>
    )
}

export default PageCabinet