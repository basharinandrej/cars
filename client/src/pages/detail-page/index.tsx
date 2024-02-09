import React from 'react'
import {useParams} from 'react-router-dom'
import {DetailInformation} from '@features'


export const DetailPage = () => {
    const {id} = useParams()

    return (
        <>
            <DetailInformation id={Number(id)}/>
        </>
    )
}