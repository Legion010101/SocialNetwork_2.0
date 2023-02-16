import './App..css'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ProfileUserContainerAPI} from './components/Main/Profile/ProfileUser/ProfileUserContainer'
import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Preloader} from './common/preloader/Preloader'
import {ActionTypes, initializationLoading} from './redux/appReducer'
import {withSuspense} from './hoc/withSuspense'
import {AppStateType} from './redux/reduxStore'
import {getInitialization} from './redux/reduxSelectors/authSelector'
import {ThunkDispatch} from 'redux-thunk'
import type {MenuProps} from 'antd'
import {Layout, theme} from 'antd'
import {SideBar} from './components/SideBar/SideBar'
import {Header} from './components/Header/Header'

const Users = React.lazy(() => import('./components/Main/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Main/Login/Login'))
const Setting = React.lazy(() => import('./components/Main/Setting/Setting'))
const ChatPage = React.lazy(() => import('./components/Main/Chat/ChatPage'))

const {Content, Footer, Sider} = Layout

export type MenuItem = Required<MenuProps>['items'][number]

export const App: FC = () => {
  const initialization = useSelector(getInitialization)
  const dispatch: appDispatch = useDispatch()

  useEffect(() => {
    dispatch(initializationLoading())
  }, [initialization, initializationLoading])

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: {colorBgContainer},
  } = theme.useToken()
  if (!initialization) {
    return <Preloader toggle={true} />
  } else {
    return (
      <Layout className="mainLayer">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}>
          {!collapsed ? (
            <h2 className="headerLogo">Fakebook</h2>
          ) : (
            <h2 className="headerLogo"></h2>
          )}
          <SideBar />
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content style={{margin: '0 16px'}}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}>
              <Routes>
                <Route
                  path="/social-network"
                  element={<Navigate to={'/profile/me'} />}
                />
                <Route
                  path="/profile/:userId"
                  element={<ProfileUserContainerAPI />}
                />
                <Route path="/findUsers" element={withSuspense(Users)} />
                <Route path="/chatPage" element={withSuspense(ChatPage)} />

                <Route path="/setting" element={withSuspense(Setting)} />
                <Route path="/login" element={withSuspense(Login)} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Production of Danil</Footer>
        </Layout>
      </Layout>
    )
  }
}

type appDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
