import {combineReducers, applyMiddleware} from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from '@reduxjs/toolkit'
import {profileReducer} from './profileReducer'
import {dialogsReducer} from './dialogsReducer'
import {sidebarReducer} from './sidebarReducer'
import {usersFindReducer} from './usersFindReducer'
import {authReducer} from './authReducer'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './appReducer'
import {compose} from 'redux'

let reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: dialogsReducer,
  navig: sidebarReducer,
  usersFind: usersFindReducer,
  authReducer: authReducer,
  app: appReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(compose(applyMiddleware(thunkMiddleware))),
)

export {store}
