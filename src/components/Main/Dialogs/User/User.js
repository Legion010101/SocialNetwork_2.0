import s from '../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

const User = ({users}) => {
  const active = ({isActive}) => (isActive ? s.active : undefined)
  return (
    <div>
      {users.map((user) => {
        let path = '/dialogs/' + user.key
        return (
          <div key={user.key} className={s.dialog}>
            <img src={user.ava} alt="ava" />
            <NavLink to={path} className={active}>
              {user.name}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}

export {User}
