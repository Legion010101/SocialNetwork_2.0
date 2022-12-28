import style from './Messages.module.css'
import React from 'react'
import {Formik, Form, Field} from 'formik'
import {MaxLength} from '../../../../utility/validate'

const NewMessages = ({sendNewMessage, user}) => {
  const validateMessage = MaxLength(50)

  return (
    <div className={style.newMessage}>
      <Formik
        initialValues={{
          messageText: '',
        }}
        onSubmit={(values) => {
          sendNewMessage(user, values.messageText)
          values.messageText = ''
        }}>
        {({values, errors, isValidating}) => (
          <Form>
            <Field
              type="text"
              name="messageText"
              placeholder="your message"
              value={values.messageText}
              validate={validateMessage}
            />
            {errors.messageText && <div>{errors.messageText}</div>}
            <div>
              <button type="submit">Send</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export {NewMessages}
