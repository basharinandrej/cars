import {FC} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { List } from 'antd'
import {getItems} from '../model/selectors'
import {fetchCarUser} from '../model/async-actions/fetch-cars-user'
import {deleteCarUser} from '../model/async-actions/delete-car-user'
import { useSelector } from 'react-redux'
import moment from 'moment'

import styles from './garage.module.sass'

export const Garage:FC<Props> = () => {

    const dispatch = useAppDispatch()
    const cars = useSelector(getItems)

    useMount(() => {
        dispatch(fetchCarUser())
    })

    const onClickHandler = (vinCode: string) => {
        dispatch(deleteCarUser(vinCode))
    }

    const header = (
        <div className={styles.header}>
            <p>Номер</p>
            <p>VIN-номер</p>
            <p>Бранд</p>
            <p>Модель</p>
            <p>Цвет</p>
            <p>Год</p>
            <div className={styles.headButton} />
        </div>
    )
    return (
        <>
            <h2 className={styles.title}>Мои машины</h2>

            {cars.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={cars}
                        className={styles.list}
                        renderItem={
                            (car, idx) => <List.Item
                                className={styles.item}
                            >
                                <p>{idx+1}</p>
                                <p>{car.vinCode}</p>
                                <p>{car.brand}</p>
                                <p>{car.model}</p>
                                <p>{car.color}</p>
                                <p>{moment(car.year).format('YYYY')}</p>
                                
                                <div className={styles.buttonDelete}>
                                    <Button text={'Удалить'} onClick={()=>onClickHandler(car.vinCode)} danger />
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : null}
        </>
    )
}

interface Props {}