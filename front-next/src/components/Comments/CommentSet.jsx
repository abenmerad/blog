import Comment from "./Comment"

const CommentSet = (props) => {
  const { commentState, setCommentState } = props

  return (
    <div className="container mx-1/2 flex flex-wrap">
      {Object.values(commentState).map((comment) => (
        <Comment key={comment.id} state={comment} setData={setCommentState} />
      ))}
    </div>
  )
}
export default CommentSet
