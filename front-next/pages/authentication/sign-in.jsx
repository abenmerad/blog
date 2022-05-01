import { Formik } from "formik"
import * as yup from "yup"
import { useCallback, useContext, useState } from "react"
import Button from "@components/Form/Button.jsx"
import FormField from "@components/Form/FormField.jsx"
import { makeClient } from "@services/makeClient.js"
import { AppContext } from "@components/Context/AppContext"
import { useRouter } from "next/router"
import Link from "next/link"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("email"),
  password: yup.string().min(8).required().label("password"),
})

const SignInForm = () => {
  const [error, setError] = useState(null)
  const { login } = useContext(AppContext)
  const router = useRouter()

  const handleFormSubmit = useCallback(async ({ email, password }) => {
    setError(null)

    try {
      const { data } = await makeClient().post("/sign-in", { email, password })

      if (!data.jwt) {
        throw new Error("Jwt is missing")
      }
      console.log({ data })
      login(data)
      router.push({
        pathname: "/",
        query: { messageInfo: "You have successfully logged in" },
      })
    } catch (err) {
      const { response: { data } = {} } = err
      if (data.message) {
        setError(data.message)

        return
      }

      setError("We're sorry, an error has occured.")
    }
  }, [])

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="shadow-md rounded p-10 mb-4 grid justify-items-center items-center w-full"
        >
          {error ? (
            <p className="bg-red-600 text-white font-bold px-4 py-2">{error}</p>
          ) : null}
          <FormField
            name="email"
            label="E-mail"
            type="text"
            placeholder="Enter your email"
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Button
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-500"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Sign in
          </Button>
          <span className="block flex flex-col text-center font-sm">
            <span>Or</span>
            <Link href="/authentication/sign-up">
              <a className="underline decoration-text-sky-500 text-sky-500 hover:text-sky-600">
                Sign-up
              </a>
            </Link>
          </span>
        </form>
      )}
    </Formik>
  )
}
export default SignInForm
