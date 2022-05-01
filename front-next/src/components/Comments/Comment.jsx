import Link from "next/link"
import { ImCross } from "react-icons/im"
import { useState, useContext } from "react"
import RemoveCommentModal from "@components/Modal/RemoveCommentModal"
import { AppContext } from "@components/Context/AppContext"

const Comment = (props) => {
  const { state, setData } = props
  const [showRemoveComment, setShowRemoveComment] = useState(false)
  const { sessionUserId, sessionRightUser } = useContext(AppContext)

  const isAuthor = (commentUserId) => {
    return Number(commentUserId) === Number(sessionUserId)
  }

  return (
    <div className="flex justify-center items-center mt-5 w-full">
      {showRemoveComment ? (
        <RemoveCommentModal
          toggleModal={setShowRemoveComment}
          commentInfo={state}
          setData={setData}
        />
      ) : null}
      <div className="px-7 w-[700px] rounded-[12px] bg-white p-4">
        <p className="text-sm font-semibold text-blue-900 transition-all hover:text-black flex justify-between">
          <div>
            By
            <Link
              href={`/users/profil/${state.userId}`}
              className="font-semibold hover:text-gray-800 cursor-pointer "
            >
              {` ${state.author}`}
            </Link>
            , {`Published on ${Date(state.postedAt)}`}
          </div>
          {sessionRightUser === "admin" || isAuthor(state.userId) ? (
            <div>
              <ImCross
                className="hover:cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowRemoveComment(true)
                }}
              />
            </div>
          ) : null}
        </p>
        <p className="px-3 text-sm py-1 mt-5 outline-none border-pink-300 w-full resize-none border rounded-lg placeholder:text-sm">
          {state.content}
        </p>
      </div>
    </div>
  )
}
export default Comment
