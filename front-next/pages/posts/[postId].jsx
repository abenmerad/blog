import { useState } from "react"
import AboutUs from "@components/Posts/AboutUs"
import PostSection from "@components/Posts/PostSection"
import ErrorBox from "@components/Misc/ErrorBox"

export const getServerSideProps = async (context) => {
  const { params } = context
  const { postId } = params

  const resPost = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/posts/${postId}`
  )
  const dataPost = await resPost.json()

  const resComments = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + `/posts/${postId}/comments`
  )
  const dataComments = await resComments.json()
  return {
    props: { post: dataPost, comments: dataComments },
  }
}

const PostPage = ({ post, comments }) => {
  const [postState, setPostState] = useState(post)
  const [error, setError] = useState(null)
  return error ? (
    <ErrorBox message={error} />
  ) : (
    <div className="container mx-auto flex flex-wrap py-6">
      <PostSection
        state={postState}
        setState={setPostState}
        comments={comments}
      />
      <AboutUs />
    </div>
  )
}
export default PostPage
