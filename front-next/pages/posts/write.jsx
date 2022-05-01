import { Formik } from "formik"
import * as yup from "yup"
import { useCallback, useContext, useState } from "react"
import Button from "@components/Form/Button.jsx"
import FormField from "@components/Form/FormField.jsx"
import { makeClient } from "@services/makeClient.js"
import { AppContext } from "@components/Context/AppContext"
import { useRouter } from "next/router"

const initialValues = {
  title: "",
  description: "",
}

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title"),
  description: yup.string().required().label("Description content"),
})

const WritePostPage = () => {
  const [error, setError] = useState(null)
  const { jwt, sessionUserId } = useContext(AppContext)
  const router = useRouter()

  const handleFormSubmit = useCallback(async ({ title, description }) => {
    setError(null)

    try {
      const { data } = await makeClient({
        headers: { authentication: jwt },
        session: { sessionUserId },
      }).post("/posts", {
        title,
        description,
        userId: sessionUserId,
      })

      router.push({
        pathname: `/posts/${data.id}`,
        query: { messageInfo: "Post successfully created" },
      })
    } catch (err) {
      const { response: { data } = {} } = err
      if (data.message) {
        setError(data.message.nativeError.detail)

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
          className="shadow-md rounded p-10 mb-4  justify-items-center items-center w-full"
        >
          {error ? (
            <p className="bg-red-600 text-white font-bold px-4 py-2">{error}</p>
          ) : null}
          <FormField
            name="title"
            label="Title *"
            type="text"
            placeholder="Enter a title for your post"
          />

          <FormField
            name="description"
            label="Description content *"
            as="textarea"
            rows="5"
            className="form-control resize-none bg-gray-200 shadow-inner rounded-l p-2 flex-1 w-full"
            placeholder="Enter any content"
          />
          <div className="flex justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-1/2 mt-5 active:bg-blue-500"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Send post
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}
export default WritePostPage
