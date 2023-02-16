import {Field, Form, Formik, FormikHelpers} from 'formik'
import {validateRequired} from '../../../utility/validate'
import {Navigate} from 'react-router-dom'
import React, {FC} from 'react'
import {loginType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getCaptcha, getIsAuth} from '../../../redux/reduxSelectors/authSelector'
import {ActionTypes, loginUser} from '../../../redux/authReducer'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/reduxStore'
import style from './Login.module.css'

const Login: FC = () => {
  const isAuth = useSelector(getIsAuth)

  if (isAuth) {
    return <Navigate to={'/SocialNetwork_2.0/profile/me'} />
  }
  return (
    <div className={style.loginContainer}>
      <h1>Login to social network</h1>
      <div className={style.loginFormContainer}>
        <LoginForm />
      </div>
    </div>
  )
}

export const LoginForm: FC = () => {
  const captcha = useSelector(getCaptcha)

  type loginDispatch = ThunkDispatch<AppStateType, any, ActionTypes>
  const dispatch: loginDispatch = useDispatch()
  const login = (
    dataUser: loginType,
    setStatus: (message: Array<string>) => void,
  ) => {
    dispatch(loginUser(dataUser, setStatus))
  }

  const validateEmail = validateRequired(4)
  const validatePassword = validateRequired(4)
  const initialValues: loginType = {
    email: '',
    password: '',
    rememberMe: false,
    captcha: '',
  }
  const onSubmit = (
    values: loginType,
    {setSubmitting, setStatus}: FormikHelpers<loginType>,
  ) => {
    login(values, setStatus)
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} validateOnBlur onSubmit={onSubmit}>
      {({values, errors, touched, status}) => (
        <Form>
          <div>
            <div className={style.loginForm}>
              <div>Email:</div>
              <div>
                <Field
                  type="email"
                  name="email"
                  value={values.email}
                  validate={validateEmail}
                />
              </div>
            </div>
            {errors.email && touched.email && (
              <div className={style.item}>{errors.email}</div>
            )}
          </div>
          <div>
            <div className={style.loginForm}>
              <div>Password:</div>
              <div>
                <Field
                  type="password"
                  name="password"
                  value={values.password}
                  validate={validatePassword}
                />
              </div>
            </div>

            {errors.password && touched.password && (
              <div className={style.item}>{errors.password}</div>
            )}
          </div>
          <div className={style.item}>
            <Field type="checkbox" name="rememberMe" />
            remember me
          </div>
          <div className={style.item}>{status}</div>
          {captcha && (
            <div className={style.item}>
              <img src={captcha} alt="captcha" />
              <div>
                <Field type="text" name="captcha" value={values.captcha} />
              </div>
            </div>
          )}
          <div className={style.item}>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default Login
