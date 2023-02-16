import {AppStateType} from '../reduxStore'

export const getNavList = (state: AppStateType) => {
  return state.navig.listNav
}
