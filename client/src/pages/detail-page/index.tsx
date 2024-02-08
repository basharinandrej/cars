import React from 'react'
import {useParams} from 'react-router-dom'



export const DetailPage = () => {
    const {vendorCode} = useParams()

    return (
        <h1>DetailPage {vendorCode}</h1>
    )
}