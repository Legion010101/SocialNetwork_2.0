import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getIdUserAuth} from '../../../../redux/reduxSelectors/authSelector'
import {ProfileDispatch} from '../ProfileUser/ProfileUser'
import {updateStatus} from '../../../../redux/profileReducer'
import {getStatus} from '../../../../redux/reduxSelectors/profileSelector'
import {useParams} from 'react-router'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../../redux/reduxStore'
import {Field, Form, Formik, FormikHelpers} from 'formik'
import {Button} from 'antd'
import {MaxLength} from '../../../../utility/validate'
import style from '../ProfileUser/ProfileUser.module.css'

const Status = () => {
  const idUserAuth = useSelector(getIdUserAuth)
  const statusProps = useSelector(getStatus)
  const userId = useParams().userId

  const dispatch: ProfileDispatch = useDispatch()

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(statusProps)
  useEffect(() => {
    setStatus(statusProps)
  }, [statusProps])

  let toggleStatusRedactorOn = () => {
    if (idUserAuth && userId === 'me') {
      setEditMode(true)
    }
  }
  let toggleStatusRedactorOff = () => {
    setEditMode(false)
    dispatch(updateStatus(status))
  }

  return (
    <div>
      {!editMode && (
        <>
          <div>{statusProps ? statusProps : 'no status'}</div>
          {idUserAuth && userId === 'me' && (
            <Button onClick={toggleStatusRedactorOn}>Redactor</Button>
          )}
        </>
      )}
      {editMode && (
        <>
          <NewStatus
            status={statusProps}
            toggleStatusRedactorOff={toggleStatusRedactorOff}
          />
        </>
      )}
    </div>
  )
}
type PropsType = {status: string | null; toggleStatusRedactorOff: () => void}
const NewStatus: FC<PropsType> = ({status, toggleStatusRedactorOff}) => {
  const dispatch: ProfileDispatch = useDispatch()
  const validateStatus = MaxLength(30)

  const onSubmit = (
    values: {status: string | null},
    {setSubmitting}: FormikHelpers<{status: string | null}>,
  ) => {
    dispatch(updateStatus(values.status))
    toggleStatusRedactorOff()
    setSubmitting(false)
  }
  const initialValues = {
    status: status,
  }
  return (
    <Formik initialValues={initialValues} validateOnBlur onSubmit={onSubmit}>
      {({values, errors}) => (
        <Form>
          <div className={style.statusText}>
            <Field
              type="text"
              name="status"
              value={values.status}
              validate={validateStatus}
            />
          </div>
          {errors.status && <div className="errors">{errors.status}</div>}
          <div>
            <button className="btn btn-primary" type="submit">
              change status
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Status
