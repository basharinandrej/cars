import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {getBrandsItems} from '../model/selectors'
import {fetchBrands} from '../model/async-action/fetch-brands'
import {deleteBrand} from '../model/async-action/delete-brand'
import { useSelector } from 'react-redux'
// import {selectedBrandForUpdate} from '../model/slices/category-details-slice'
import styles from './brand.module.sass'

const header = (
    <div className={styles.header}>
        <p>ID</p>
        <p>Название</p>
        <div className={styles.headButton} />
    </div>
)
export const Brands:FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const dispatch = useAppDispatch()
    const brands = useSelector(getBrandsItems)

    useMount(() => {
        dispatch(fetchBrands())
    })

    const onClickDeleteHandler = (id: number) => {
        dispatch(deleteBrand(id))
    }

    const onClickEditHandler = (id: number) => {
        setIsModalOpen(true)
        // dispatch(selectedBrandForUpdate(id))
    }

    return (
        <>
            <h2 className={styles.title}>Бренды автомобилей</h2>
            {/* <FormUpdatebrand isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
            
            {brands?.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={brands}
                        className={styles.list}
                        renderItem={
                            (brand) => <List.Item className={styles.item}>
                                <p>{brand.id}</p>
                                <p>{brand.name}</p>
                                
                                <div className={styles.boxButtons}>
                                    <div className={styles.buttonEdit}>
                                        <Button icon={<EditOutlined />} onClick={()=>onClickEditHandler(brand.id)} />
                                    </div>
                                    <div className={styles.buttonDelete}>
                                        <Button icon={<DeleteOutlined />} onClick={()=>onClickDeleteHandler(brand.id)} danger />
                                    </div>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : <Empty description={'Нет брендов автомобилей'} />}
        </>
    )
}

interface Props {}