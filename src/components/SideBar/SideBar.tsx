import React, {FC} from 'react'
import {MenuItem} from '../../App'
import {NavLink} from 'react-router-dom'
import {Menu} from 'antd'
import {useSelector} from 'react-redux'
import {getNavList} from '../../redux/reduxSelectors/sideBarSelector'
import {UserOutlined, CommentOutlined, TeamOutlined} from '@ant-design/icons'

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export const SideBar: FC = () => {
  const navList = useSelector(getNavList)
  const items = navList.map((link) => {
    let icon
    switch (link.text) {
      case 'Find Users': {
        icon = <TeamOutlined />
        break
      }
      case 'Messages': {
        icon = <CommentOutlined />
        break
      }
      case 'Profile': {
        icon = <UserOutlined />
        break
      }
      case 'Chat': {
        icon = <CommentOutlined />
        break
      }
    }

    return getItem(<NavLink to={link.to}>{link.text}</NavLink>, link.key, icon)
  })

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      mode="inline"
      items={items}
    />
  )
}
