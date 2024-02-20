import { Menu } from 'antd'
import { AppLink } from '@shared';
import { useSelector } from 'react-redux';
import {getSidebarItems} from '../model/selectors'

import styles from './sidebar.module.sass'


export const Sidebar = () => {

  const sidebarItems = useSelector(getSidebarItems)

  const items = sidebarItems.map((sidebarItem) => {
    return {
      key: sidebarItem.key,
      label: <AppLink to={sidebarItem.path}>{sidebarItem.text}</AppLink>,
    }
  })

  return (
    <div className={styles.sidebar}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode={'inline'}
        items={items}
      />
    </div>
  )
}