import useApi from "src/hooks/useApi"
import { AiFillCheckCircle } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import Link from "next/link"
import { makeClient } from "@services/makeClient"
import { AppContext } from "@components/Context/AppContext"
import { useState, useContext } from "react"
import ErrorBox from "@components/Misc/ErrorBox"
const AdminPanel = () => {
  const [err, data] = useApi("get", "/applications")
  const [applicationState, setApplicationState] = useState(data)

  const { jwt } = useContext(AppContext)

  const sendApplication = async (validated, applicationId) => {
    try {
      const { data } = await makeClient({
        headers: { authentication: jwt },
      }).post("/applications/manage", {
        validatedApplication: validated,
        applicationId,
      })

      if (data) {
        setApplicationState(data)
      }
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className="flex flex-col">
      {applicationState.length ? (
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h2 className="text-3xl font-semibold text-center mt-5 leading-normal mt-0 mb-2 text-black-800">
            Pending Author Application
          </h2>
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Application date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(applicationState).map((application) => (
                    <tr className="bg-gray-100 border-b justify-start">
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link href={`/users/profil/${application.userId}`}>
                          {application.author}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {application.applicationDate}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-around w-1/2">
                        <ImCross
                          size={20}
                          className="text-red-500 hover:text-red-600 active:text-red-700"
                          onClick={() => {
                            sendApplication(false, application.id)
                          }}
                        />
                        <AiFillCheckCircle
                          size={20}
                          className="text-green-500 hover:text-green-600 active:text-green-700"
                          onClick={() => {
                            sendApplication(true, application.id)
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="bg-amber-400 text-white text-center font-bold px-4 py-2 mt-5 w-1/2">
            Any author application found for now... Come back later
          </p>
        </div>
      )}
    </div>
  )
}
export default AdminPanel
