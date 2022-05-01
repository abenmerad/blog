import Button from "@components/Form/Button"
import { Formik } from "formik"
import * as yup from "yup"
import { useCallback, useContext, useState } from "react"
import FormField from "@components/Form/FormField.jsx"
import { makeClient } from "@services/makeClient.js"
import { AppContext } from "@components/Context/AppContext"
import RemoveUserModal from "./RemoveUserModal"

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  displayName: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().label("Email"),
  displayName: yup.string().label("Display name"),
  password: yup.string().min(8).label("Password"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords mismatching"),
})

const EditProfilPage = (props) => {
  const { toggleModal, userInfo, setData } = props
  const [error, setError] = useState(null)
  const { jwt, sessionUserId } = useContext(AppContext)
  const [showRemoveUser, setShowRemoveUser] = useState(false)

  const handleFormSubmit = useCallback(
    async ({ email, displayName, password }) => {
      setError(null)

      try {
        const { data } = await makeClient({
          headers: { authentication: jwt },
          session: { userId: sessionUserId },
        }).put(`/users/${userInfo.id}`, {
          email,
          displayName,
          password,
          userId: userInfo.id,
        })
        toggleModal(false)
        setData(data)
      } catch (err) {
        const { response: { data } = {} } = err
        if (data.message) {
          setError(checkReturnedErrorMessage(data.message.nativeError.detail))

          return
        }

        setError("We're sorry, an error has occured.")
      }
    },
    []
  )
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {showRemoveUser ? (
          <RemoveUserModal
            toggleModal={setShowRemoveUser}
            userInfo={userInfo}
          />
        ) : null}
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
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
                      <p className="bg-red-600 text-white font-bold px-4 py-2">
                        {error}
                      </p>
                    ) : null}
                    <FormField
                      name="email"
                      label="E-mail *"
                      type="text"
                      placeholder="Enter your email"
                    />
                    <FormField
                      name="displayName"
                      label="Display name"
                      type="text"
                      placeholder="Enter an alias"
                    />
                    <FormField
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                    />
                    <FormField
                      name="passwordConfirmation"
                      label="Password confirmation"
                      type="password"
                      placeholder="Confirm your password"
                    />
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-500 mt-5"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      Update
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setShowRemoveUser(true)
                }}
              >
                Delete Account
              </Button>
              <Button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  toggleModal(false)
                }}
              >
                Abort
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
export default EditProfilPage
