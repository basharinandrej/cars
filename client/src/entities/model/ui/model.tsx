import {FC, useState} from 'react'
import { useAppDispatch, useMount, Button} from '@shared'
import { Empty, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {getModelsItems} from '../model/selectors'
import {fetchModels} from '../model/async-action/fetch-models'
import {deleteModel} from '../model/async-action/delete-model'
import { useSelector } from 'react-redux'
import {FormUpdateModel} from '../ui/components/form-update-model/form-update-model'
import {selectedModelForUpdate} from '../model/slices/model-slice'

import styles from './model.module.sass'

const header = (
    <div className={styles.header}>
        <p>ID</p>
        <p>Название</p>
        <div className={styles.headButton} />
    </div>
)
export const Models:FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const dispatch = useAppDispatch()
    const models = useSelector(getModelsItems)

    useMount(() => {
        dispatch(fetchModels())
    })

    const onClickDeleteHandler = (id: number) => {
        dispatch(deleteModel(id))
    }

    const onClickEditHandler = (id: number) => {
        setIsModalOpen(true)
        dispatch(selectedModelForUpdate(id))
    }

    return (
        <>
            <h2 className={styles.title}>Модели автомобилей</h2>
            <FormUpdateModel isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            
            {models?.length 
                ? <div className={styles.scroll}>
                    <List
                        header={header}
                        size="small"
                        dataSource={models}
                        className={styles.list}
                        renderItem={
                            (model) => <List.Item className={styles.item}>
                                <p>{model.id}</p>
                                <p>{model.name}</p>
                                
                                <div className={styles.boxButtons}>
                                    <div className={styles.buttonEdit}>
                                        <Button icon={<EditOutlined />} onClick={()=>onClickEditHandler(model.id)} />
                                    </div>
                                    <div className={styles.buttonDelete}>
                                        <Button icon={<DeleteOutlined />} onClick={()=>onClickDeleteHandler(model.id)} danger />
                                    </div>
                                </div>
                            </List.Item>
                        }
                    />
                </div>
                : <Empty description={'Нет моделей автомобиля'} />}
        </>
    )
}

interface Props {}