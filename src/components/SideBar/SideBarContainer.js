import {SideBar} from './SideBar'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
  return {
    navList: state.navig.listNav,
    users: state.messagePage.users,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {}
}

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar)
export {SideBarContainer}
