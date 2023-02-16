import {Field, Form, Formik, FormikHelpers} from 'formik'
import React, {FC, useState} from 'react'
import styles from './UserSelector.module.css'
import {isShowFriendType} from '../../../../redux/usersFindReducer'

type Props = {
  getUsers: (
    pageNumber: number,
    usersNumber: number,
    userName: string,
    isFriend: isShowFriendType,
  ) => void
  isFriend: isShowFriendType
  userName: string
  pageNumber: number
  usersNumber: number
}

const UserSelectorForm: FC<Props> = (props) => {
  const [searchByPreviousName, setSearchByPreviousName] = useState(
    props.userName ? props.userName : '',
  )
  const [searchByIsFriend, setSearchByIsFriend] = useState(
    props.isFriend ? props.isFriend : 'any',
  )
  type initialValuesTypes = typeof initialValues
  const initialValues = {
    pageNumber: props.pageNumber,
    usersNumber: props.usersNumber,
    userName: searchByPreviousName,
    isFriend: searchByIsFriend,
  }

  const onSubmit = (
    values: initialValuesTypes,
    {setSubmitting}: FormikHelpers<initialValuesTypes>,
  ) => {
    if (
      searchByPreviousName === values.userName &&
      searchByIsFriend === values.isFriend
    ) {
      props.getUsers(
        values.pageNumber,
        values.usersNumber,
        values.userName,
        values.isFriend,
      )
    } else {
      props.getUsers(1, values.usersNumber, values.userName, values.isFriend)
      setSearchByPreviousName(values.userName)
    }
    setSubmitting(false)
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validateOnBlur
      onSubmit={onSubmit}>
      {({values}) => (
        <Form>
          <div className={styles.searchForm}>
            <div className={styles.userName}>
              <Field
                type="text"
                name="userName"
                value={values.userName}
                placeholder="find a user"
              />
              <hr />
            </div>

            <div>
              <Field as="select" name="isFriend">
                <option value="any">All User</option>
                <option value="false"> Without friend</option>
                <option value="true">Friend</option>
              </Field>
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Find
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default UserSelectorForm
