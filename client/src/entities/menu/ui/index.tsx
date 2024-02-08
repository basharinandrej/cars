import {useSelector} from 'react-redux'
import {AppLink} from '@shared';
import {getMenuItems} from '../model/selectors'

import styles from './index.module.sass'

export const Menu = () => {


    const menuItems = useSelector(getMenuItems)

    return (
        <div className={styles.menu}>
            {menuItems.map((menuItem, idx) => {
                return <AppLink 
                    key={menuItem.path + idx} 
                    to={menuItem.path}
                    >
                        {menuItem.text}
                    </AppLink>
            })}
        </div>
    )
}
