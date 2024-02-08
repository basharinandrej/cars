import React, {FC} from 'react'
import { Button as Btn, ButtonProps } from 'antd';
import styles from './index.module.sass'

export const Button:FC<Props> = ({text, onClick}) => {

    return (
        <Btn
            className={styles.button}
            type="primary"
            onClick={onClick}
        >
                {text}
        </Btn>
    )
}

interface Props extends ButtonProps{
    text: string
}