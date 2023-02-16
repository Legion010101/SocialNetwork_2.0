import style from '../components/Main/Profile/ProfileUser/ProfileUser.module.css'
import defaultAva from '../accept/img/defaultAva.jpg'

const Avatar = ({
  avatar,
  classAvatar,
}: {
  avatar?: string | null
  classAvatar?: string
}) => {
  return (
    <img
      className={classAvatar ? classAvatar : style.avatar}
      src={avatar || defaultAva}
      alt="avatar sleep"
    />
  )
}

export {Avatar}
