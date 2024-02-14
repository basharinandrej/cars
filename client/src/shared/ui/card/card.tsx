import { ReactNode, FC} from 'react'
import { Card as CardFromAntD, Badge } from 'antd'
import classNames from 'classnames'

import { AppLink} from '../app-link'
import {APP_CLIENT_URL} from '../../constans'


import styles from './card.module.sass'

export const Card: FC<Props> = ({
    children,
    textBadge,
    colorBadge,
    loading,
    placement = 'start',
    to,
    src,
    type = 'grid'
}) => {

    const bodyStyle = type === 'row' ? {width: '100%'} : {}
    
    const contentCard = (
        <Badge.Ribbon
            placement={placement}
            text={textBadge}
            color={colorBadge}
        >
            <CardFromAntD
                loading={loading}
                size={'small'}
                bodyStyle={bodyStyle}
                className={classNames(
                    styles.card,
                    {
                        [styles.row]: type === 'row',
                        [styles.grid]: type === 'grid'
                    }
                )}
                
                cover={
                    <img
                        className={classNames(styles.img)}
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
    textBadge: string
    colorBadge: string
    children: ReactNode
    src: string
    loading: boolean
    type?: 'grid' | 'row'
    placement?: RibbonPlacement
    to?: string
}