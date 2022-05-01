import useApi from "src/hooks/useApi"
import CommentSet from "@components/Comments/CommentSet"
import { useState } from "react"
import SetPosts from "@components/Posts/PostSet"

const UserActivity = (props) => {
  const { userId } = props
  const [errComments, dataComments] = useApi("get", `/users/${userId}/comments`)
  const [errPosts, dataPosts] = useApi("get", `/users/${userId}/posts`)
  const [stateComments, setStateComments] = useState(dataComments)
  const [statePosts, setStatePosts] = useState(dataPosts)

  return (
    <>
      <div className="w-full md:w-2/3 flex flex-col items-center px-3">
        <h2 class="text-2xl font-normal leading-normal mt-0 mb-2 text-pink-800">
          Latest posts
        </h2>
        <SetPosts state={dataPosts} {...props} />
      </div>
      <aside className="w-full md:w-1/3 flex flex-col items-center px-3">
        <h2 class="text-2xl font-normal leading-normal mt-0 mb-2 text-pink-800">
          Latest comments
        </h2>
        <div className="w-full bg-white shadow flex flex-col my-4 p-6">
          <CommentSet
            commentState={dataComments}
            setCommentState={setStateComments}
          />
        </div>
      </aside>
    </>
  )
}
export default UserActivity
