import {FC} from 'react'



export const Page404: FC<Props> = ({
    error
}) => {
    

    return (
        <h1>404 - {error}</h1>
    )
}

interface Props {
    error?: string
}