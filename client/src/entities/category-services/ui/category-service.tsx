import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {getCategoryServicesItems} from '../model/selectors'
import {fetchCategoryServices} from '../model/async-actions/fetch-category-service'
import { useSelector } from 'react-redux'
import {deleteCategoryService} from '../model/async-actions/delete-category-service'
import {FormUpdateCategoryService} from './components/form-update-category-detail/form-update-category-service'
import {selectedCategoryServiceForUpdate} from '../model/slices/category-service-slice'
import styles from './category-service.module.sass'

const header = (
    <div className={styles.header}>
        <p>ID</p>
        <p>Название</p>
        <div className={styles.headButton} />
    </div>
)
export const CategoryServices:FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const dispatch = useAppDispatch()
    const categoryServices = useSelector(getCategoryServicesItems)

    useMount(() => {
        dispatch(fetchCategoryServices())
    })

    const onClickDeleteHandler = (id: number) => {
        dispatch(deleteCategoryService(id))
    }

    const onClickEditHandler = (id: number) => {
        setIsModalOpen(true)
        dispatch(selectedCategoryServiceForUpdate(id))
    }

    return (
        <>
            <h2 className={styles.title}>Категории деталей</h2>
            <FormUpdateCategoryService isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            
            {categoryServices.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={categoryServices}
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