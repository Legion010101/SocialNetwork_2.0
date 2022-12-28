import s from './MyPosts.module.css'
import {Post} from './Post/Post'
import {NewPosts} from './Post/NewPosts'

const MyPosts = ({data, addPost, info}) => {
  return (
    <div className={s.blog}>
      <div>
        <h3>New Post</h3>
      </div>

      <NewPosts addPost={addPost} />

      <div className={s.posts}>
        <h4>My post</h4>
      </div>
      <Post data={data} info={info} />
    </div>
  )
}

export {MyPosts}
