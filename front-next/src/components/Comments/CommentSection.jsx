import CommentSet from "./CommentSet"
import CommentForm from "./CommentForm"
import { useState, useContext } from "react"
import { AppContext } from "@components/Context/AppContext"
import Link from "next/link"

const CommentSection = (props) => {
  const [sharedCommentState, setSharedCommentState] = useState(props.comments)
  const { jwt, sessionUserId } = useContext(AppContext)

  return (
    <>
      {jwt && sessionUserId ? (
        <CommentForm
          postState={props.postState}
          commentState={sharedCommentState}
          setCommentState={setSharedCommentState}
        />
      ) : (
        <div className="flex justify-center items-center mt-5 w-full">
          <div className="px-7 w-[700px] rounded-[12px] bg-white p-4">
            <p className="px-3 text-center text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm">
              <span className="text-sky-500 underline ">
                <Link href={"/authentication/sign-in"}>Sign-in</Link>
              </span>
              <span> to leave your comment</span>
            </p>
          </div>
        </div>
      )}
      <CommentSet
        commentState={sharedCommentState}
        setCommentState={setSharedCommentState}
      />
    </>
  )
}
export default CommentSection
