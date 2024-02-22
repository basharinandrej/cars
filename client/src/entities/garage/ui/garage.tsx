import {FC, useState} from 'react'
import { Button, useAppDispatch, useMount} from '@shared'
import { List, Modal } from 'antd'
import {getItems} from '../model/selectors'
import {fetchCarUser} from '../model/async-actions/fetch-cars-user'
import { useSelector } from 'react-redux'
import moment from 'moment'

import styles from './garage.module.sass'

export const Garage:FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch()
    const cars = useSelector(getItems)

    useMount(() => {
        dispatch(fetchCarUser())
    })

    const showModal = () => setIsModalOpen(true)
    const handleOk = () => setIsModalOpen(false)
    const handleCancel = () => setIsModalOpen(false)


    const header = (
        <div className={styles.header}>
            <p>Номер</p>
            <p>VIN-номер</p>
            <p>Бранд</p>
            <p>Модель</p>
            <p>Цвет</p>
            <p>Год</p>
        </div>
    )
    return (
        <>
        <div className={styles.car}>
            <div className={styles.carButton}>
                <Button text='Добавить' onClick={showModal} />
            </div>

            <h2 className={styles.title}>Мои машины</h2>

            {cars.length 
                ? <List
                    header={header}
                    size="small"
                    dataSource={cars}
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
                        </List.Item>
                    }
                />
                : null}
        </div>
         <Modal title="Добавить машину" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
       </>
    )
}

interface Props {}