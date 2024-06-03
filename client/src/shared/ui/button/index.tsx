import {FC} from 'react'
import { Button as Btn, ButtonProps } from 'antd';
import classNames from 'classnames'
import styles from './index.module.sass'

export const Button:FC<Props> = ({
    text, 
    onClick, 
    size = '',
    type = 'primary',
    htmlType,
    danger = false,
    icon,
    disabled,
    className
}) => {

    return (
        <Btn
            className={classNames(styles.button, className, {
                [styles.large]: size === 'large'
            })}
            type={type}
            onClick={onClick}
            htmlType={htmlType}
            danger={danger}
            disabled={disabled}
        >
            {text || icon}
        </Btn>
    )
}

interface Props extends Omit<ButtonProps, 'size'>{
    text?: string
    size?: 'large'
}