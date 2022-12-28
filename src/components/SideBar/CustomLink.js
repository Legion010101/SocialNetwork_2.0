import s from './SideBar.module.css'
import {NavLink} from 'react-router-dom'
import {BestFriend} from './Friends/BestFriend'

function CustomLink({list, users}) {
  const active = ({isActive}) => (isActive ? s.active : undefined)
  return (
    <div>
      {list.map((link) => {
        return (
          <div key={link.key} className={`${s.item}`}>
            <NavLink className={active} to={link.to}>
              {link.text}
            </NavLink>
            <BestFriend text={link.text} users={users} />
          </div>
        )
      })}
    </div>
  )
}

export {CustomLink}
