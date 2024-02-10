import React, { ReactNode, FC} from 'react'
import { Card as CardFromAntD, Badge } from 'antd'

import { AppLink} from '../app-link'
import {APP_CLIENT_URL} from '../../constans'


import styles from './card.module.sass'

export const Card: FC<Props> = ({
    children,
    textBadge,
    colorBadge,
    to,
    src
}) => {

    const contentCard = (
        <Badge.Ribbon
            placement='start'
            text={textBadge}
            color={colorBadge}
        >
            <CardFromAntD
                size={'small'}
                className={styles.card}
                
                cover={
                    <img
                        className={styles.img}
                        src={`${APP_CLIENT_URL}/${src}`}
                    />
                }
            >
                {children}
            </CardFromAntD>
        </Badge.Ribbon>
    )


    return to ? (<AppLink to={to}>{contentCard}</AppLink>) : contentCard
}

type RibbonPlacement = 'start' | 'end';

interface Props {
    placement: RibbonPlacement
    textBadge: string
    colorBadge: string
    children: ReactNode
    to: string
    src: string
}