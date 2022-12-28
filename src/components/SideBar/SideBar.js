import s from './SideBar.module.css'
import {CustomLink} from './CustomLink'

function SideBar({navList, users}) {
  return (
    <nav className={s.leftConsole}>
      <CustomLink list={navList} users={users} />
    </nav>
  )
}

export {SideBar}
