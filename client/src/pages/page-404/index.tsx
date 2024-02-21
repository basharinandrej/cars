import {FC} from 'react'
import { Result } from 'antd';
import { AppLink, Button } from '@shared';

import styles from './index.module.sass'

export const Page404: FC<Props> = ({
    error
}) => {
    
    const ButtonBackToHome = (
        <div className={styles.btn}>
          <AppLink to={'/'}>
                <Button text={'На главную'}/>
            </AppLink>
        </div>
    )

    return <Result
        status="404"
        title="404"
        subTitle={error}
        extra={ButtonBackToHome}
        rootClassName={styles.rootClassName}
    />
}

interface Props {
    error?: string
}
