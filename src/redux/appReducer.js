import {authUser} from '../redux/authReducer'

const initialState = {
  initialization: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZATION_SUCCESSFUL: {
      return {
        ...state,
        initialization: true,
      }
    }
    default:
      return state
  }
}
const INITIALIZATION_SUCCESSFUL = 'main/INITIALIZATION-SUCCESSFUL'

const authorizationUser = () => ({
  type: INITIALIZATION_SUCCESSFUL,
})

export const initializationLoading = () => (dispatch) => {
  dispatch(authUser()).then(() => {
    dispatch(authorizationUser())
  })
}

export {appReducer}
