import React, {FC} from 'react'
import {Avatar} from '../../../../common/Avatar'
import {useDispatch, useSelector} from 'react-redux'
import {getIdUserAuth} from '../../../../redux/reduxSelectors/authSelector'

import {updateAvatar} from '../../../../redux/profileReducer'
import {ProfileDispatch} from './ProfileUser'
import {useParams} from 'react-router'
import style from './ProfileUser.module.css'
import {Button} from 'antd'

const AvatarUser: FC<PropsAvatar> = ({avatar}) => {
  const idUserAuth = useSelector(getIdUserAuth)
  const dispatch: ProfileDispatch = useDispatch()
  const userId = useParams().userId

  const setNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file = e.target.files[0]
      dispatch(updateAvatar(file))
    }
  }

  return (
    <div>
      <div>
        <Avatar avatar={avatar} classAvatar={style.profileAvatar} />

        {idUserAuth && userId === 'me' && (
          <Button>
            <label htmlFor="input__file">Redactor</label>
          </Button>
        )}
        {idUserAuth && userId === 'me' && (
          <input
            type="file"
            name="file"
            id="input__file"
            onChange={setNewAvatar}
            style={{display: 'none'}}
          />
        )}
      </div>
    </div>
  )
}
export {AvatarUser}

type PropsAvatar = {
  userId?: number | null | undefined
  avatar: string | null | undefined
}
