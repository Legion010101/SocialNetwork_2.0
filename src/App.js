import './App..css'
import {SideBarContainer} from './components/SideBar/SideBarContainer'
import {Routes, Route} from 'react-router-dom'
import {News} from './components/Main/News/News'
import {Music} from './components/Main/Music/Music'
import {Setting} from './components/Main/Setting/Setting'
import ProfileUser from './components/Main/Profile/ProfileUser/ProfileUserContainer'
import Dialogs from './components/Main/Dialogs/Dialogs'
import {HeaderContainer} from './components/Header/HeaderContainer'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Preloader} from './common/preloader/Preloader'
import {initializationLoading} from './redux/appReducer'
import {withSuspense} from './hoc/withSuspense'

const Users = React.lazy(() => import('./components/Main/Users/UsersContainer'))
const Login = React.lazy(() => import('./components/Main/Login/LoginContainer'))

const App = (props) => {
  const {initialization, initializationLoading} = props
  useEffect(() => {
    initializationLoading()
  }, [initialization, initializationLoading])

  if (!props.initialization) {
    return <Preloader toggle={true} />
  } else {
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <SideBarContainer />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<ProfileUser />} />
            <Route path="/profile/me" element={<ProfileUser />} />
            <Route path="/profile/:userId" element={<ProfileUser />} />
            <Route path="dialogs/*" element={<Dialogs />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/findUsers" element={withSuspense(Users)} />{' '}
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={withSuspense(Login)} />
          </Routes>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {initialization: state.app.initialization}
}
const appContainer = connect(mapStateToProps, {initializationLoading})(App)
export default appContainer
