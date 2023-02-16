import React, {FC, useEffect, useState} from 'react'
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

export const SideBar: FC<PropsType> = ({location}) => {
  const navList = useSelector(getNavList)

  const [activeKey, setActiveKey] = useState('1')
  useEffect(() => {
    switch (location.slice(19, 20)) {
      case 'p': {
        setActiveKey('1')
        break
      }
      case 'f': {
        setActiveKey('2')
        break
      }
      case 'c': {
        setActiveKey('3')
        break
      }
    }
  }, [location])

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
      selectedKeys={[activeKey]}
    />
  )
}
type PropsType = {
  location: string
}
