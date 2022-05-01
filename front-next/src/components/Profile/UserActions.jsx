import { BiLogOut } from "react-icons/bi"
import Button from "@components/Form/Button"
import { useContext, useState } from "react"
import { AppContext } from "@components/Context/AppContext"
import Link from "next/link"
import { useRouter } from "next/router"
import RemoveUserModal from "@components/Modal/RemoveUserModal"

const UserActions = (props) => {
  const router = useRouter()
  const { setShowModalAuthorApplication, setShowModalEdit, state } = props
  const { sessionUserId, logout } = useContext(AppContext)
  const [showRemoveUser, setShowRemoveUser] = useState(false)

  const isOwnerProfile = () => {
    return Number(state.id) === Number(sessionUserId)
  }

  const onLogout = () => {
    logout()
    router.push({
      pathname: "/",
      query: { messageInfo: "You're now disconnected" },
    })
  }

  return (
    <div>
      {showRemoveUser ? (
        <RemoveUserModal toggleModal={setShowRemoveUser} userInfo={state} />
      ) : null}
      <ul className="sm:w-full lg:mt-2 text-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:border-gray-600 dark:text-black">
        <li className="w-full px-4 py-2 border-b border-sky-200 dark:border-gray-600 hover:text-gray-500">
          <span
            className="hover:cursor-pointer hover:text-gray-900"
            onClick={() => {
              setShowModalEdit(true)
            }}
          >
            Edit Profil
          </span>
        </li>
        {isOwnerProfile() && state.right === "reader" ? (
          <li className="w-full px-4 py-2 border-b border-sky-200 dark:border-gray-600 hover:text-gray-500">
            <a
              href="#"
              onClick={() => {
                setShowModalAuthorApplication(true)
              }}
            >
              Want to be an author ?
            </a>
          </li>
        ) : null}
        {isOwnerProfile() ? (
          <li className="w-full px-4 py-2 rounded-b-lg flex justify-around">
            <span
              className="hover:text-red-700 active:text-red-800 hover:cursor-pointer"
              onClick={onLogout}
            >
              <BiLogOut size={25} />
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  )
}
export default UserActions
