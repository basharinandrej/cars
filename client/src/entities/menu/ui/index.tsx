import {useSelector} from 'react-redux'
import {useMemo, useState} from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import {AppLink} from '@shared';
import {getMenuItems} from '../model/selectors'

import styles from './index.module.sass'

export const Menu = () => {
    const [open, setOpen] = useState(false);

    const showDrawerHandler = () => setOpen(true);
    const closeDrawerHandler = () => setOpen(false)

    const menuItems = useSelector(getMenuItems)

    const isMobile = document.documentElement.clientWidth < 600
    const isTablet = document.documentElement.clientWidth >= 600 && document.documentElement.clientWidth < 960

    const renderMenu = useMemo(() => (
        <>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    {menuItems.map((menuItem, idx) => {
                        return <li 
                            className={styles.listItem}
                            onClick={closeDrawerHandler}
                        >
                            <AppLink 
                                key={menuItem.path + idx} 
                                to={menuItem.path}
                            >
                                {menuItem.text}
                            </AppLink>
                        </li>
                    })}
                </ul>
            </nav>
            <nav className={styles.navigationCabinet}>
                <ul>
                    <li>Вход</li>
                </ul>
            </nav>
        </>
    ), [menuItems])
    

    const menuForMobileAndTablet = (
        <>
            <Drawer
                className='drawer'
                title="Меню" 
                onClose={closeDrawerHandler} 
                open={open}
            >
                {renderMenu}
            </Drawer>

            <MenuOutlined className={styles.menuIcon} onClick={showDrawerHandler} />
        </>
    )

    const menuForDesktop = renderMenu

    return (isMobile || isTablet ? menuForMobileAndTablet : menuForDesktop)
}
