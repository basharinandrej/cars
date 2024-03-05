import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {getCategoryDetailsItems} from '../model/selectors'
import {fetchCategoryDetails} from '../model/async-actions/fetch-category-details'
import { useSelector } from 'react-redux'
// import {FormUpdateCar} from './components/form-update-car/form-update-car'

import styles from './category-details.module.sass'

const header = (
    <div className={styles.header}>
        <p>ID</p>
        <p>Название</p>
        <div className={styles.headButton} />
    </div>
)
export const CategoryDetails:FC<Props> = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
  
    const dispatch = useAppDispatch()
    const categoryDetails = useSelector(getCategoryDetailsItems)

    useMount(() => {
        dispatch(fetchCategoryDetails())
    })

    const onClickDeleteHandler = (id: number) => {
        // dispatch(deleteCarUser(vinCode))
    }

    const onClickEditHandler = (id: number) => {
        // setIsModalOpen(true)
        // dispatch(selectedCarForUpdate(vinCode))
    }

    return (
        <>
            <h2 className={styles.title}>Категории деталей</h2>
            {/* <FormUpdateCar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
            
            {categoryDetails.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={categoryDetails}
                        className={styles.list}
                        renderItem={
                            (categoryDetail) => <List.Item className={styles.item}>
                                <p>{categoryDetail.id}</p>
                                <p>{categoryDetail.name}</p>
                                
                                <div className={styles.boxButtons}>
                                    <div className={styles.buttonEdit}>
                                        <Button icon={<EditOutlined />} onClick={()=>onClickEditHandler(categoryDetail.id)} />
                                    </div>
                                    <div className={styles.buttonDelete}>
                                        <Button icon={<DeleteOutlined />} onClick={()=>onClickDeleteHandler(categoryDetail.id)} danger />
                                    </div>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : <Empty description={'Нет категорий деталей'} />}
        </>
    )
}

interface Props {}