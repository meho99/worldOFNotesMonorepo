import { TextFieldProps } from '@material-ui/core/TextField'
import { DeepMap, FieldError, FieldValues } from 'react-hook-form'

export type TextInputProps = TextFieldProps & {
  errors: DeepMap<FieldValues, FieldError>
}
