import { Services } from "@entities"
import {useAppDispatch} from '@shared'
import { fetchServices } from "../model/async-actions/fetch-services"
import { useSelector } from "react-redux"
import {getIdOrganization, getServices} from '../model/selectors'
import {useEffect} from 'react'


export const ListingServices = () => {
    const dispatch = useAppDispatch()

    const idOrganization = useSelector(getIdOrganization)
    const services = useSelector(getServices)

    useEffect(() => {
        idOrganization && dispatch(fetchServices(idOrganization))
    }, [idOrganization])


    return (
        <Services services={services} isFullContainer/>
    )
}