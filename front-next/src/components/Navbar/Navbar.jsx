import { MdAccountCircle } from "react-icons/md"
import NavbarField from "./NavbarField.jsx"
import { useContext } from "react"
import { AppContext } from "@components/Context/AppContext.jsx"
import { MdOutlineMessage } from "react-icons/md"
import { MdAdminPanelSettings } from "react-icons/md"

const Navbar = () => {
  const { sessionUserId, sessionRightUser } = useContext(AppContext)

  return typeof window === "undefined" ? null : (
    <nav className="flex items-center flex-wrap bg-stone-700 p-3">
      <NavbarField href="/">
        <div className="text-xl text-white font-bold uppercase tracking-wide">
          Groundblog
        </div>
      </NavbarField>
      <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto">
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-center  flex flex-col lg:h-auto">
          {sessionRightUser && sessionRightUser !== "reader" ? (
            <NavbarField href="/posts/write">
              <MdOutlineMessage size={16} />
            </NavbarField>
          ) : null}
          {sessionRightUser && sessionRightUser === "admin" ? (
            <NavbarField href="/admin/panel">
              <MdAdminPanelSettings size={16} />
            </NavbarField>
          ) : null}
          <NavbarField
            href={
              !sessionUserId
                ? "/authentication/sign-in"
                : `/users/profil/${sessionUserId}`
            }
          >
            <MdAccountCircle size={32} />
          </NavbarField>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
