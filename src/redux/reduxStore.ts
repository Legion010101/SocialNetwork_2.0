import {combineReducers, applyMiddleware, Action} from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from '@reduxjs/toolkit'
import {profileReducer} from './profileReducer'
import dialogsReducer from './dialogsReducer'
import sidebarReducer from './sidebarReducer'
import {usersFindReducer} from './usersFindReducer'
import {authReducer} from './authReducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {appReducer} from './appReducer'
import {compose} from 'redux'

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagePage: dialogsReducer,
  navig: sidebarReducer,
  usersFind: usersFindReducer,
  authReducer: authReducer,
  app: appReducer,
})
type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never

export type ThankTypeCreator<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  any,
  A
>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export {store}
