import s from '../SideBar.module.css'
import {NavLink} from 'react-router-dom'

function BestFriend({text, users}) {
  const active = ({isActive}) => (isActive ? s.active : undefined)

  return (
    <div className={s.friends}>
      {text === 'Find Users'
        ? users.map((user, index) => {
            if (index < 3) {
              let path = '/dialogs/' + user.key
              return (
                <div key={user.key} className={s.friend}>
                  <img src={user.ava} alt="ava" />
                  <NavLink to={path} className={active}>
                    {user.name}
                  </NavLink>
                </div>
              )
            }
            return ''
          })
        : ''}
    </div>
  )
}

export {BestFriend}
