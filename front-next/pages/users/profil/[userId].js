import useApi from "src/hooks/useApi"
import { useState, useEffect } from "react"

import ErrorBox from "@components/Misc/ErrorBox"

import UserProfile from "@components/Profile/UserProfile"

export const getServerSideProps = async (context) => {
  const { params } = context
  const { userId } = params

  const resUser = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/users/${userId}`
  )
  const dataUser = await resUser.json()

  return {
    props: { user: dataUser },
  }
}

const ProfilPage = ({ user }) => {
  console.log({ user })
  const [err, data] = useApi("get", `/users/${user.id}`)
  const [state, setState] = useState(data)

  useEffect(() => {
    return () => {
      setState([null, {}])
    }
  }, [])

  useEffect(() => {
    setState(data)
  }, [data])

  return err ? (
    <ErrorBox message={err.statusText} />
  ) : (
    <UserProfile state={state} setState={setState} />
  )
}
export default ProfilPage
