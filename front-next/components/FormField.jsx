import { Field } from "formik"
import Input from "./Input"

const FormField = (props) => {
  const { children, as: Component = Input, ...otherProps } = props

  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {children}
      </label>
      <Field {...otherProps}>
        {({ field, meta: { touched, error } }) => (
          <>
            <Component {...field} {...otherProps} />
            {touched && error ? (
              <p className="text-danger">{error}</p>
            ) : null}
          </>
        )}
      </Field>
    </div>
  )
}

export default FormField
