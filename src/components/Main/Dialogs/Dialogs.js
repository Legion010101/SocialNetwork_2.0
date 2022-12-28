import s from './Dialogs.module.css'
import {UserContainer} from './User/UserContainer'
import {MessagesContainer} from './Messages/MessagesContainer'

const Dialogs = () => {
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        <UserContainer />
      </div>

      <div className={s.messages}>
        <MessagesContainer />
      </div>
    </div>
  )
}
export default Dialogs
