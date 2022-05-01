import Image from "next/image"
import Button from "@components/Form/Button"
import { FaUserEdit } from "react-icons/fa"
import { useContext, useState } from "react"
import { AppContext } from "@components/Context/AppContext"
import { MdDelete } from "react-icons/md"
import RemoveUserModal from "@components/Modal/RemoveUserModal"

const UserInfo = (props) => {
  const { state } = props
  const { sessionUserId, sessionRightUser } = useContext(AppContext)
  const [showRemoveUser, setShowRemoveUser] = useState(false)

  const isOwnerProfile = () => {
    return Number(state.id) === Number(sessionUserId)
  }

  return (
    <div>
      {showRemoveUser ? (
        <RemoveUserModal toggleModal={setShowRemoveUser} userInfo={state} />
      ) : null}
      <div className="text-center">
        <Image src="/profil.png" width="100" height="100" />
      </div>
      <h5 className="mb-2 text-center">
        {`${state.displayName} ${isOwnerProfile() ? `(${state.email})` : ""}`}
        {!isOwnerProfile() && sessionRightUser === "admin" ? (
          <Button
            className="bg-red-400 hover:bg-red-500 active:bg-red-600 ml-3 rounded-full"
            onClick={() => setShowRemoveUser(true)}
          >
            <MdDelete />
          </Button>
        ) : null}
      </h5>
      <div className="text-center mb-2">
        <span className="bg-sky-400 p-1 px-4 rounded text-white">
          {state.right}
        </span>
      </div>
    </div>
  )
}
export default UserInfo
