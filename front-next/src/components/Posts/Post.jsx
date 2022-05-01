import Link from "next/link"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@components/Context/AppContext"
import Button from "@components/Form/Button"
import { BsEyeFill } from "react-icons/bs"

const Post = (props) => {
  const [showEditPost, setShowEditPost] = useState(false)
  const { state } = props
  const { jwt, sessionUserId } = useContext(AppContext)

  const isAuthor = (userId) => {
    return Number(userId) === Number(sessionUserId)
  }

  return (
    <section className="w-1/2 flex flex-col items-center px-3">
      <article className="flex flex-col shadow my-4">
        <div className="hover:opacity-75">
          <Image src="/postPicture.jpg" width="1000" height="500" />
        </div>
        <div className="bg-white flex flex-col justify-start p-6">
          <span className="text-3xl font-bold hover:text-gray-700 pb-4 flex">
            {state.title}
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
          <p className="pb-3">
            <Link href={`/posts/${state.id}`}>
              <Button className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 ml-3 rounded-full ">
                <BsEyeFill />
              </Button>
            </Link>
          </p>
        </div>
      </article>
    </section>
  )
}
export default Post
