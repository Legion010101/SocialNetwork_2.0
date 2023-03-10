type Validate = (value: string) => string | undefined

export const MaxLength =
  (lengthValue: number): Validate =>
  (value) => {
    let error
    if (!value) {
      error = ' '
    } else if (value.length > lengthValue) {
      error = `Must be less than ${lengthValue} characters`
    }
    return error
  }
export const validateRequired =
  (lengthValue = 1): Validate =>
  (value) => {
    let error
    if (!value) {
      error = 'Required'
    } else if (value.length < lengthValue) {
      error = `Must be ${lengthValue} characters or more`
    }
    return error
  }
