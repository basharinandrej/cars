import { Menu } from 'antd'
import {SelectInfo} from 'rc-menu/lib/interface'
import { AppLink, getIsMobile, getIsTablet, useAppDispatch, useMount } from '@shared';
import { useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom'
import {getSidebarItems,getCurrentSidebarItem, getUserRole, getUserId} from '../model/selectors'
import {SidebarItem} from '../interfaces'
import {setCurrentSidebarItem, initCurrentSidebarItem} from '../model/slices/sidebar-slice'
import {iconMap} from '../dictonaries/icon-map'

import styles from './sidebar.module.sass'


export const Sidebar = () => {
  const {pathname} = useLocation()
  const dispatch = useAppDispatch()

  useMount(() => {
    dispatch(initCurrentSidebarItem({pathname}))
  })
  const sidebarItems = useSelector(getSidebarItems)
  const userRole = useSelector(getUserRole)
  const currentSidebarItem = useSelector(getCurrentSidebarItem)
  const isUser = Boolean(useSelector(getUserId))

  const isCollapsed = getIsMobile() || getIsTablet()

  const items = sidebarItems.map((sidebarItem) => {
    if(Array.isArray(sidebarItem.permissionForUserRole)) {
      if(!sidebarItem.permissionForUserRole.includes(userRole)) {
        return 
      }
    }

    if(isUser && sidebarItem.onlyOrganization) {
      return
    }

    return {
      key: sidebarItem.key,
      label: <AppLink to={sidebarItem.path}>{sidebarItem.text}</AppLink>,
      icon: iconMap[sidebarItem.iconType]
    }
  })

  const onSelectHandler= ({selectedKeys}: SelectInfo) => {
    dispatch(setCurrentSidebarItem(Number(selectedKeys[0])))
  }

  return (
    <div className={styles.sidebar}>
      <Menu
        selectedKeys={[currentSidebarItem.toString()]}
        inlineCollapsed={isCollapsed}
        mode={'inline'}
        items={items}
        className={styles.sidebarList}
        onSelect={onSelectHandler}
      />
    </div>
  )
}