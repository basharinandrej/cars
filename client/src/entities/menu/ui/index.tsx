import {useSelector} from 'react-redux'
import {useMemo, useState} from 'react'
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import {AppLink, getIsMobile, getIsTablet} from '@shared';
import {
    getMenuItems,
    getNameUser,
    getIdUser,
    getSurnameUser
} from '../model/selectors'

import styles from './index.module.sass'

export const Menu = () => {
    const [open, setOpen] = useState(false);

    const isMobile = getIsMobile()
    const isTablet = getIsTablet()

    const showDrawerHandler = () => setOpen(true);
    const closeDrawerHandler = () => setOpen(false)

    const menuItems = useSelector(getMenuItems)
    const userName = useSelector(getNameUser)
    const userSurname = useSelector(getSurnameUser)
    const userId = useSelector(getIdUser)


    const renderMenu = useMemo(() => (
        <>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    {menuItems.map((menuItem, idx) => {
                        return <li
                            key={menuItem.path + idx} 
                            className={styles.listItem}
                            onClick={closeDrawerHandler}
                        >
                            <AppLink to={menuItem.path}>
                                {menuItem.text}
                            </AppLink>
                        </li>
                    })}
                </ul>
            </nav>
            <nav className={styles.navigationCabinet}>
                <ul>
                    {!userId && <li>
                        <AppLink to={'/login'}>
                            Вход
                        </AppLink>
                    </li>}
                    {userId && <li>
                        <AppLink to={`cabinet/${userId}`}>
                            {userSurname} {userName[0]}.
                        </AppLink>
                    </li>}
                </ul>
            </nav>
        </>
    ), [menuItems, userId])
    

    const menuForMobileAndTablet = (
        <>
            <Drawer
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
