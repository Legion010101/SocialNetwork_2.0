import {Messages} from './Messages'
import {sendNewMessage} from '../../../../redux/dialogsReducer'
import {connect} from 'react-redux'
import {AuthNavigate} from '../../../../hoc/AuthNavigate'
import {compose} from 'redux'

let mapStateToProps = (state) => {
  return {
    message: state.messagePage.messages,
    users: state.messagePage.users,
    my: state.profilePage.profileInfo,
  }
}

const MessagesContainer = compose(
  connect(mapStateToProps, {
    sendNewMessage,
  }),
  AuthNavigate,
)(Messages)

export {MessagesContainer}
