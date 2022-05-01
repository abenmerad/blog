import { MdAccountCircle } from "react-icons/md"
import NavbarField from "./NavbarField.jsx"
import { useContext } from "react"
import { AppContext } from "@components/Context/AppContext.jsx"
import useApi from "src/hooks/useApi.js"
import { BiMessageAltDetail } from "react-icons/bi"
import { MdAdminPanelSettings } from "react-icons/md"
const Navbar = () => {
  const { jwt, sessionUserId } = useContext(AppContext)
  const [err, data] = useApi("get", `/users/${sessionUserId}`)

  return (
    <nav className="flex items-center flex-wrap bg-stone-700 p-3">
      <NavbarField href="/">
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Groundblog
        </span>
      </NavbarField>
      <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto">
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-center  flex flex-col lg:h-auto">
          {jwt && data.right !== "reader" ? (
            <NavbarField href="/posts/write">
              <BiMessageAltDetail size={16} />
            </NavbarField>
          ) : null}
          {jwt && data.right === "admin" ? (
            <NavbarField href="/admin/panel">
              <MdAdminPanelSettings className="text-white" size={16} />
            </NavbarField>
          ) : null}
          <NavbarField
            href={
              !jwt
                ? "/authentication/sign-in"
                : `/users/profil/${[sessionUserId]}`
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
