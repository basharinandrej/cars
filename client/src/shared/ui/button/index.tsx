import {FC} from 'react'
import { Button as Btn, ButtonProps } from 'antd';
import classNames from 'classnames'
import styles from './index.module.sass'

export const Button:FC<Props> = ({
    text, 
    onClick, 
    size = '',
    type = 'primary'
}) => {

    return (
        <Btn
            className={classNames(styles.button, {
                [styles.large]: size === 'large'
            })}
            type={type}
            onClick={onClick}
        >
                {text}
        </Btn>
    )
}

interface Props extends Omit<ButtonProps, 'size'>{
    text: string
    size?: 'large'
}