import {addPost} from '../../../../redux/profileReducer'
import {MyPosts} from './MyPosts'
import {connect} from 'react-redux'

let mapStateToProps = (state) => {
  return {
    data: state.profilePage.postsData,
    info: state.profilePage.profileInfo,
  }
}

const MyPostsContainer = connect(mapStateToProps, {
  addPost,
})(MyPosts)

export {MyPostsContainer}
