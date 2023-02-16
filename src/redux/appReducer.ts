import {authUser} from './authReducer'
import {InferActionType} from './reduxStore'

const initialState = {
  initialization: false,
}

const appReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  switch (action.type) {
    case 'main/INITIALIZATION-SUCCESSFUL': {
      return {
        ...state,
        initialization: true,
      }
    }
    default:
      return state
  }
}
const actionsApp = {
  authorizationUser: () =>
    ({
      type: 'main/INITIALIZATION-SUCCESSFUL',
    } as const),
}

export const initializationLoading = () => (dispatch: any) => {
  dispatch(authUser()).then(() => {
    dispatch(actionsApp.authorizationUser())
  })
}

export {appReducer}
type initialStateType = typeof initialState
export type ActionTypes = InferActionType<typeof actionsApp>
