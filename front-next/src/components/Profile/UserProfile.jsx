import UserInfo from "@components/Profile/UserInfo"
import UserActions from "@components/Profile/UserActions"
import { useState, useContext } from "react"
import EditProfilPage from "@components/Modal/EditProfilModal"
import AuthorApplicationModal from "@components/Modal/AuthorApplicationModal"
import { AppContext } from "@components/Context/AppContext"
import UserActivity from "./UserActivity"

const UserProfile = (props) => {
  const { state, setState } = props
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalAuthorApplication, setShowModalAuthorApplication] =
    useState(false)

  const { sessionUserId } = useContext(AppContext)

  const isOwnerProfile = () => {
    return Number(state.id) === Number(sessionUserId)
  }
  return (
    <div className="flex-col">
      <div className="flex justify-center">
        {showModalEdit ? (
          <EditProfilPage
            toggleModal={setShowModalEdit}
            userInfo={state}
            setData={setState}
          />
        ) : null}

        {showModalAuthorApplication ? (
          <AuthorApplicationModal
            toggleModal={setShowModalAuthorApplication}
            userInfo={state}
          />
        ) : null}
        <div className="mt-2 w-1/2 ">
          <div className="lg:flex md:grid justify-around border-solid border-2 border-sky-500">
            <UserInfo state={state} />
            {isOwnerProfile() ? (
              <UserActions
                state={state}
                setShowModalAuthorApplication={setShowModalAuthorApplication}
                setShowModalEdit={setShowModalEdit}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap py-6">
        <UserActivity userId={state.id} />
      </div>
    </div>
  )
}
export default UserProfile
