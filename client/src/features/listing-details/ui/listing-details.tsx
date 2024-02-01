import axios from 'axios'
import { useEffect, useState } from 'react';
import { Card, Badge } from 'antd';
import moment from 'moment'
import {mapBadge} from './maps/map-badge'
import {Detail} from '../interfaces/interfaces'
import styles from './listing-details.module.sass'


const instanceAxios = axios.create({
    baseURL: process.env.CLIENT_APP_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});


export const ListingDetails = () => {
    const [details, setDetails] = useState<Array<any>>()

    useEffect(() => {
        instanceAxios.get('/api/detail')
        .then((response) => {
            setDetails(response.data.items)
        })
    }, [])


    return <div className={styles.listingDetails}>
        {details?.map((detail: Detail) => {
            const textBadge = mapBadge[detail.wear].value
            const colorBadge = mapBadge[detail.wear].color

            return <Badge.Ribbon text={textBadge} color={colorBadge}>
                <Card
                    size={'small'}
                    key={detail.id} 
                    className={styles.card}
                    cover={
                        <img
                            className={styles.img}
                            src={`http://localhost:3000/${detail.photo}`}
                        />
                    }
                >
                    <div className={styles.wrapper}>
                        <h3 className={styles.title}>{detail.name}</h3>
                        <p className={styles.price}>Цена: <strong>{detail.price}</strong>&nbsp;p.</p>
                        <p className={styles.date}>{moment(detail.createadAt).format('DD.MM.YYYY')}</p>
                    </div>
                </Card>
            </Badge.Ribbon>
        })}
    </div>
}


export default ListingDetails