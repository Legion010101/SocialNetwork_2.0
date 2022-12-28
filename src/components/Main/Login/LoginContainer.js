import {Login} from './Login'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {loginUser} from '../../../redux/authReducer'

let mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuthorized,
  }
}
const LoginContainer = compose(connect(mapStateToProps, {loginUser}))(Login)
export default LoginContainer
