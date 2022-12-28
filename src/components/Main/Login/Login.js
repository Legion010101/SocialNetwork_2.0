import {Formik, Field, Form} from 'formik'
import {conditionsError, validateRequired} from '../../../utility/validate'
import {Navigate} from 'react-router-dom'
import React from 'react'
import {FieldHelper} from '../../../utility/FieldHelper'

export const Login = (props) => {
  if (props.isAuth) {
    return <Navigate to={'/profile/me'} />
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm {...props} />
    </div>
  )
}
export const LoginForm = (props) => {
  const validateEmail = validateRequired(4)
  const validatePassword = validateRequired(4)
  const onSubmit = (values, {setSubmitting, setStatus}) => {
    props.loginUser(values, setStatus)
    setSubmitting(false)
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
      }}
      validateOnBlur
      onSubmit={onSubmit}>
      {({values, errors, touched, status}) => (
        <Form>
          <div>
            <Field
              className={errors.email && touched.email && 'errorsInput'}
              type="email"
              name="email"
              placeholder="email"
              value={values.email}
              validate={validateEmail}
            />

            {errors.email && touched.email && (
              <div className="errors">{errors.email}</div>
            )}
          </div>
          <div>
            <Field
              className={errors.password && touched.password && 'errorsInput'}
              type="text"
              name="password"
              placeholder="password"
              value={values.password}
              validate={validatePassword}
            />
            {errors.password && touched.password && (
              <div className="errors">{errors.password}</div>
            )}
          </div>

          <div>
            <Field type="checkbox" name="rememberMe" />
            remember me
          </div>

          <div className={'errors'}>{status}</div>
          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
