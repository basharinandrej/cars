import axios from 'axios'
import { useEffect, useState } from 'react';
import { Card, Descriptions } from 'antd';
import styles from './listing-details.module.sass'
import moment from 'moment'



const instanceAxios = axios.create({
    baseURL: process.env.CLIENT_APP_BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

export const ListingDetails = () => {
    const [details, setDetails] = useState<Array<any>>()

    useEffect(() => {
        instanceAxios.get('/api/detail?offset=5')
        .then((response) => {
            setDetails(response.data.items)
        })
    }, [])


    return <div className={styles.listingDetails}>
        {details?.map((detail) => {
            return <Card
                size={'small'}
                key={detail.id} 
                className={styles.card}
                cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>{detail.name}</h3>
                    <p className={styles.description}>{detail.description}</p>
                    <p className={styles.price}>Цена: <strong>{detail.price}</strong>&nbsp;p.</p>
                    <p className={styles.date}>{moment(detail.createadAt).format('DD.MM.YYYY')}</p>
                </div>
            </Card>
        })}
    </div>
}


export default ListingDetails