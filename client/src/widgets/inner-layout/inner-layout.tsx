import {FC, ReactElement} from 'react'
import {Container} from '@shared';
import {Menu, Logo, Sidebar} from '@entities'

import styles from './inner-layout.module.sass'


export const InnerLayout: FC<Props> = ({children}) => {


    return(
        <div className={styles.layout}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                
                <Menu />
            </div>

            <Sidebar />
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