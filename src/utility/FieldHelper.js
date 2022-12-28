import {Field} from 'formik'
import React from 'react'

export const FieldHelper = (
  type,
  name,
  placeholder,
  value,
  validate,
  className,
) => {
  return (
    <Field
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      validate={validate}
    />
  )
}
