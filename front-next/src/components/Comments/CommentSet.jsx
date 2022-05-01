import useApi from "src/hooks/useApi"
import Comment from "./Comment"
import ErrorBox from "@components/Misc/ErrorBox"
import { useState, useEffect } from "react"
import { makeClient } from "@services/makeClient"
import { AppContext } from "@components/Context/AppContext"
import { useContext } from "react"

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
