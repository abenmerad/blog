import Post from "./Post"
import useApi from "src/hooks/useApi"
import { useState } from "react"
import ErrorBox from "@components/Misc/ErrorBox"
const SetPosts = (props) => {
  const { userId } = props
  const [err, data] = useApi(
    "get",
    `/posts/${typeof userId === "undefined" ? "" : userId}`
  )

  return err ? (
    <ErrorBox message={data.statusText} />
  ) : (
    <div className="container mx-1/2 flex flex-wrap">
      {Object.values(data).map((post) => (
        <Post key={post.id} state={post} />
      ))}
    </div>
  )
}
export default SetPosts
