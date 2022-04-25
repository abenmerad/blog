import { Formik } from "formik"
import * as yup from "yup"
import { useCallback, useContext } from "react"
import Button from "../../components/Button.jsx"
import FormField from "../../components/FormField.jsx"

const initialValues = {
  email: "",
  password: "",
}
const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("email"),
  password: yup.string().min(8).required().label("password")
})

const SignInForm = () => {

  const handleFormSubmit = useCallback(async (values) => {
    return true
  }, [])

  return (
    <div className="mt-8 flex justify-center">
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting }) =>
      (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <FormField
            name="email"
            type="text"
            placeholder="Enter your email"
          >
            Email
          </FormField>
          <FormField
            name="password"
            type="password"
            placeholder="Enter your password"
          >
            Password
          </FormField>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Sign in
          </Button>
        </form>
      )
      }
    </Formik>
    </div>
  )
}
export default SignInForm