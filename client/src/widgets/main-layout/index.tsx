import {FC, ReactElement} from 'react'
import {Container} from '@shared';
import {Menu, Logo} from '@entities'

import styles from './index.module.sass'


export const MainLayout: FC<Props> = ({children}) => {


    return(
        <div className={styles.layout}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                
                <Menu />
            </div>

            <main className={styles.main}>
                <Container>
                    {children}
                </Container>
            </main>
        </div>
    )
}

interface Props {
    children: ReactElement
}