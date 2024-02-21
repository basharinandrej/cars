import { Menu } from 'antd'
import { AppLink, getIsMobile, getIsTablet } from '@shared';
import { useSelector } from 'react-redux';
import {getSidebarItems} from '../model/selectors'
import {iconMap} from '../dictonaries/icon-map'

import styles from './sidebar.module.sass'


export const Sidebar = () => {
  const sidebarItems = useSelector(getSidebarItems)
  const isCollapsed = getIsMobile() || getIsTablet()

  const items = sidebarItems.map((sidebarItem) => {
    return {
      key: sidebarItem.key,
      label: <AppLink to={sidebarItem.path}>{sidebarItem.text}</AppLink>,
      icon: iconMap[sidebarItem.iconType]
    }
  })

  return (
    <div className={styles.sidebar}>
      <Menu
        defaultSelectedKeys={['1']}
        inlineCollapsed={isCollapsed}
        mode={'inline'}
        items={items}
        className={styles.sidebarList}
      />
    </div>
  )
}