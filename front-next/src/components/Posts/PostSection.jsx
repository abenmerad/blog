import Link from "next/link"
import Image from "next/image"
import { BiEditAlt } from "react-icons/bi"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@components/Context/AppContext"
import Button from "@components/Form/Button"
import EditPostModal from "@components/Modal/EditPostModal"
import RemovePostModal from "@components/Modal/RemovePostModal"
import CommentSection from "@components/Comments/CommentSection"
import { IoIosRemoveCircle } from "react-icons/io"

const PostSection = (props) => {
  const [showEditPost, setShowEditPost] = useState(false)
  const [showRemovePost, setShowRemovePost] = useState(false)
  const { setState = {}, state } = props

  const { sessionUserId, sessionRightUser } = useContext(AppContext)
  const isAuthor = (userId) => {
    return Number(userId) === Number(sessionUserId)
  }
  return (
    <section className="w-full md:w-2/3 flex flex-col items-center px-3">
      {showEditPost ? (
        <EditPostModal
          toggleModal={setShowEditPost}
          postInfo={state}
          setData={setState}
        />
      ) : null}
      {showRemovePost ? (
        <RemovePostModal
          toggleModal={setShowRemovePost}
          postInfo={state}
          setData={setState}
        />
      ) : null}
      <article className="flex flex-col shadow my-4">
        <div className="hover:opacity-75">
          <Image src="/postPicture.jpg" width="1000" height="500" />
        </div>
        <div className="bg-white flex flex-col justify-start p-6">
          <span className="text-3xl font-bold hover:text-gray-700 pb-4 flex">
            {state.title}
            {isAuthor(state.userId) || sessionRightUser === "admin" ? (
              <span>
                <Button
                  className="bg-green-400 hover:bg-green-500 active:bg-green-600 ml-3 rounded-full"
                  onClick={() => {
                    setShowEditPost(true)
                  }}
                >
                  <BiEditAlt size={20} />
                </Button>
                <Button
                  className="bg-red-400 hover:bg-red-500 active:bg-red-600 ml-3 rounded-full"
                  onClick={() => {
                    setShowRemovePost(true)
                  }}
                >
                  <IoIosRemoveCircle size={20} />
                </Button>
              </span>
            ) : null}
          </span>
          <p className="text-sm pb-8">
            By
            <Link
              href={`/users/profil/${state.userId}`}
              className="font-semibold hover:text-gray-800"
            >
              {` ${state.author}`}
            </Link>
            , {`Published on ${Date(state.createdAt)}`}
          </p>
          <p className="pb-3">{state.description}</p>
        </div>
      </article>

      <CommentSection postState={props.state} comments={props.comments} />
    </section>
  )
}
export default PostSection
