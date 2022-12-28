export const MaxLength = (lengthValue) => (value) => {
  let error
  if (!value) {
    error = ' '
  } else if (value.length > lengthValue) {
    error = `Must be less than ${lengthValue} characters`
  }
  return error
}
export const validateRequired = (lengthValue) => (value) => {
  let error
  if (!value) {
    error = 'Required'
  } else if (value.length < lengthValue) {
    error = `Must be ${lengthValue} characters or more`
  }
  return error
}
export const conditionsError = (errors, touched, name) => {
  const conditions = errors.name && touched.name && 'errorsInput'
  return conditions
}
