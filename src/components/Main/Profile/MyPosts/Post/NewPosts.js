import {Formik, Form, Field} from 'formik'
import React from 'react'
import {MaxLength} from '../../../../../utility/validate'

function NewPosts({addPost}) {
  const validatePost = MaxLength(500)

  return (
    <Formik
      initialValues={{
        postText: '',
      }}
      onSubmit={(values) => {
        addPost(values.postText)
        values.postText = ''
      }}>
      {({values, errors, isValidating}) => (
        <Form>
          <div>
            <div>
              <Field
                className={errors.postText && 'errorsInput'}
                type="text"
                component="textarea"
                name="postText"
                placeholder="your post"
                value={values.postText}
                cols="30"
                rows="5"
                validate={validatePost}
              />
            </div>

            {errors.postText && (
              <span className="errors">{errors.postText}</span>
            )}
          </div>
          <div>
            <button type="submit">Add post</button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export {NewPosts}
