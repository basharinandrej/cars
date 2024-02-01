import {FC, ReactElement} from 'react'
import styles from './container.module.sass'


const Container: FC<Props> = ({children}) => {

    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

interface Props {
    children: ReactElement
}

export default Container