import Button from "@components/Form/Button"
import { useContext } from "react"
import { makeClient } from "@services/makeClient.js"
import { AppContext } from "@components/Context/AppContext"
import useApi from "src/hooks/useApi"
import ErrorBox from "@components/Misc/ErrorBox"

const AuthorApplicationModal = (props) => {
  const { toggleModal, userInfo } = props
  const { jwt } = useContext(AppContext)
  const [err, data] = useApi("get", `/applications/${userInfo.id}`)

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                Do you enjoy reading the articles on Groundblog and commenting
                on them? Then I guess you would like to go further by sharing
                your deep thoughts, smart ideas and more? The author position is
                for you! Don't hesitate to apply, an administrator will process
                your application as soon as possible.
              </p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <Button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  toggleModal(false)
                }}
              >
                Abort
              </Button>
              {!err && data ? (
                <Button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {
                    toggleModal(false)
                  }}
                >
                  Application already sent...
                </Button>
              ) : (
                <Button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={async () => {
                    try {
                      const { data } = await makeClient({
                        headers: { authentication: jwt },
                      }).post("/applications", { userId: userInfo.id })

                      console.log(data)
                      toggleModal(false)
                    } catch (err) {
                      console.log({ err })
                    }
                  }}
                >
                  Became a real artis... Author
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
export default AuthorApplicationModal
