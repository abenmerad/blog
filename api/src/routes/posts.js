import authentication from "../middleware/authentication.js"
import PostsModel from "../models/posts.js"
import checkSession from "../middleware/checkSession.js"
import CommentsModel from "../models/comments.js"
import UsersModel from "../models/users.js"

const postsRoute = ({ app }) => {
  app.post("/posts", authentication, checkSession, async (req, res) => {
    const {
      body: { title, description, userId },
    } = req

    try {
      const user = UsersModel.query().findOne({ userId })

      if (!user) {
        res.status(401).send({ error: "User not found" })

        return
      }

      const post = await PostsModel.query().insertAndFetch({
        title,
        description,
        userId,
      })

      res.send(post)
    } catch (err) {
      res.send({ message: err.message })
    }
  })

  app.get("/posts", async (req, res) => {
    try {
      const posts = await PostsModel.query()
        .select(
          "posts.id",
          "title",
          "createdAt",
          "description",
          "userId",
          "users.displayName as author"
        )
        .orderBy("posts.id", "desc")
        .join("users", "users.id", "posts.userId")
      if (!posts) {
        res.status(404).send({ message: "Post not found" })

        return
      }

      res.send(posts)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })

  app.get("/posts/:postId", async (req, res) => {
    const {
      params: { postId },
    } = req

    if (postId === "undefined") {
      return
    }
    try {
      const post = await PostsModel.query()
        .select(
          "posts.id",
          "title",
          "createdAt",
          "description",
          "userId",
          "users.displayName as author"
        )
        .join("users", "users.id", "posts.userId")
        .findById(Number(postId))

      if (!post) {
        res.status(404).send({ message: "Post not found" })

        return
      }

      res.send(post)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })

  app.put("/posts/:postId", authentication, async (req, res) => {
    const {
      params: { postId },
      body: { title, description, userId },
      session: { userId: sessionUserId },
    } = req

    try {
      const post = await PostsModel.query().findById(postId)
      const payload = {}
      const senderUser = await UsersModel.query()
        .select("rights.label as right")
        .join("rights", "rights.id", "users.rightId")
        .findById(sessionUserId)

      if (post.userId !== userId && senderUser.right !== "admin") {
        res.status(400).send({ message: "Forbidden" })

        return
      }

      payload.userId = post.userId

      if (title.length) {
        payload.title = title
      }

      if (description.length) {
        payload.description = description
      }
      const updatedPost = await PostsModel.query().updateAndFetchById(
        postId,
        payload
      )

      res.send(updatedPost)
    } catch (err) {
      res.send(400).send({ message: err.message })
    }
  })

  app.delete("/posts/:postId", authentication, async (req, res) => {
    const {
      params: { postId },
      session: { userId: sessionUserId },
    } = req

    try {
      const post = await PostsModel.query().findById(postId)
      const senderUser = await UsersModel.query()
        .select("rights.label as right")
        .join("rights", "rights.id", "users.rightId")
        .findById(sessionUserId)

      if (!post) {
        res.status(404).send({ message: "Post does not exists." })

        return
      }

      if (post.userId !== sessionUserId && senderUser.right !== "admin") {
        res.status(401).send({ message: "Forbidden" })

        return
      }

      await PostsModel.query().deleteById(postId)
      res.send({ message: "Post deleted successfully." })
    } catch (message) {
      res.send(message)
    }
  })
  app.get("/posts/:postId/comments", async (req, res) => {
    const {
      params: { postId },
    } = req
    try {
      const comments = await CommentsModel.query()
        .where({ postId: Number(postId) })
        .select(
          "comments.id",
          "content",
          "postedAt",
          "userId",
          "postId",
          "users.displayName as author"
        )
        .orderBy("postedAt", "desc")
        .join("users", "users.id", "comments.userId")
      res.send(comments)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })
}
export default postsRoute
