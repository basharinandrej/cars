import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {getItems} from '../model/selectors'
import {fetchCarUser} from '../model/async-actions/fetch-cars-user'
import {deleteCarUser} from '../model/async-actions/delete-car-user'
import { useSelector } from 'react-redux'
import moment from 'moment'
import {FormUpdateCar} from './components/form-update-car/form-update-car'
import {selectedCarForUpdate} from '../model/slices/car-slice'

import styles from './garage.module.sass'

const header = (
    <div className={styles.header}>
        <p>VIN-номер</p>
        <p>Бранд</p>
        <p>Модель</p>
        <p>Цвет</p>
        <p>Год</p>
        <div className={styles.headButton} />
    </div>
)
export const Garage:FC<Props> = ({id}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useAppDispatch()
    const cars = useSelector(getItems)

    useMount(() => {
        dispatch(fetchCarUser(id))
    })

    const onClickDeleteHandler = (vinCode: string) => {
        dispatch(deleteCarUser(vinCode))
    }

    const onClickEditHandler = (vinCode: string) => {
        setIsModalOpen(true)
        dispatch(selectedCarForUpdate(vinCode))
    }

    return (
        <>
            <h2 className={styles.title}>Мои машины</h2>
            <FormUpdateCar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            
            {cars.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={cars}
                        className={styles.list}
                        renderItem={
                            (car) => <List.Item className={styles.item}>
                                <p>{car.vinCode}</p>
                                <p>{car.brand}</p>
                                <p>{car.model}</p>
                                <p>{car.color}</p>
                                <p>{moment(car.year).format('YYYY')}</p>
                                
                                <div className={styles.boxButtons}>
                                    <div className={styles.buttonEdit}>
                                        <Button icon={<EditOutlined />} onClick={()=>onClickEditHandler(car.vinCode)} />
                                    </div>
                                    <div className={styles.buttonDelete}>
                                        <Button icon={<DeleteOutlined />} onClick={()=>onClickDeleteHandler(car.vinCode)} danger />
                                    </div>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : <Empty description={'В гараже нет машин'} />}
        </>
    )
}

interface Props {
    id: number
}