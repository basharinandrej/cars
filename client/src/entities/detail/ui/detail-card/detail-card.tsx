import {FC} from 'react'
import { Card } from '@shared'
import moment from 'moment'
import { IDetail } from '../../interfaces/detail-interface'
import { PATTERN_DATE } from '../../constans/constans'

import styles from './detail-card.module.sass'


export const DetailCard: FC<Props> = ({
    colorBadge,
    isLoading,
    textBadge,
    photoUrl,
    detail,
    href
}) => {


    return (
        <Card
            loading={isLoading}
            textBadge={textBadge}
            colorBadge={colorBadge}
            to={href}
            src={photoUrl}
        >
            <div className={styles.wrapper}>
                <h3 className={styles.title}>{detail.name}</h3>
                <p className={styles.price}>Цена: <strong>{detail.price}</strong>&nbsp;p.</p>
                <p className={styles.date}>{moment(detail.createdAt).format(PATTERN_DATE)}</p>
            </div>
        </Card>
    )
}

interface Props {
    isLoading: boolean
    colorBadge: string
    textBadge: string
    href: string
    detail: IDetail
    photoUrl: string
}