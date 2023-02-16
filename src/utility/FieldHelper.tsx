import {Field, FieldValidator} from 'formik'
import React from 'react'

export function FieldHelper<FormKeysType>(
  type: string,
  name: FormKeysType,
  value: string | null | undefined,
  header: string,
  comment?: string,
  validate?: any,
) {
  const h = comment ? comment : header || (name as string)
  return (
    <div>
      <div>{h}</div>
      <Field
        type={type}
        component={type === 'textarea' && type}
        name={name}
        value={value || ''}
        validate={validate}
      />
    </div>
  )
}
