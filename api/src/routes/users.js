import UsersModel from "../models/users.js"
import authentication from "../middleware/authentication.js"
import checkSession from "../middleware/checkSession.js"
import CommentsModel from "../models/comments.js"
import PostsModel from "../models/posts.js"

const usersRoute = ({ app }) => {
  app.get("/users", async (req, res) => {
    try {
      const users = await UsersModel.query()
        .select("users.id", "email", "displayName", "rights.label as right")
        .join("rights", "rights.id", "users.rightId")
      res.send(users)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })

  app.get("/users/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req

    if (typeof userId === "undefined") {
      return
    }

    try {
      const user = await UsersModel.query()
        .select("users.id", "email", "displayName", "rights.label as right")
        .join("rights", "rights.id", "users.rightId")
        .findById(Number(userId))

      if (!user) {
        res.status(404).send({ message: "An error has occured" })

        return
      }
      res.send(user)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })

  app.get("/users/:userId/comments", async (req, res) => {
    const {
      params: { userId },
    } = req

    try {
      const comments = await CommentsModel.query()
        .where({ userId })
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

  app.get("/users/:userId/posts", async (req, res) => {
    const {
      params: { userId },
    } = req

    try {
      const posts = await PostsModel.query()
        .where({ userId })
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

      res.send(posts)
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })
  app.put("/users/:userId", authentication, checkSession, async (req, res) => {
    const {
      params: { userId },
      body: { email, displayName, password },
    } = req

    if (typeof userId === "undefined") {
      return
    }

    try {
      const user = await UsersModel.query().findById(userId)
      const payload = {}
      if (!user) {
        res.status(404).send({ message: "User not found." })

        return
      }

      if (password.length) {
        const [passwordHash, passwordSalt] = hashPassword(password)
        payload.passwordHash = passwordHash
        payload.passwordSalt = passwordSalt
      }

      if (email.length) {
        payload.email = email
      }

      if (displayName.length) {
        payload.displayName = displayName
      }
      const updatedUser = await UsersModel.query().updateAndFetchById(
        user.id,
        payload
      )
      const fetchedUser = await UsersModel.query()
        .select("users.id", "email", "displayName", "rights.label as right")
        .join("rights", "rights.id", "users.rightId")
        .findById(updatedUser.id)

      res.send(fetchedUser)
    } catch (err) {
      res.status(401).send({ message: err.message })
    }
  })

  app.delete("/users/:userId", authentication, async (req, res) => {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req

    try {
      const senderUser = await UsersModel.query()
        .select("rights.label as right")
        .join("rights", "rights.id", "users.rightId")
        .findById(sessionUserId)

      if (typeof userId === "undefined") {
        return
      }

      if (sessionUserId !== Number(userId) && senderUser.right !== "admin") {
        res.status(400).send({ message: "An error has occured" })
      }

      await UsersModel.query().deleteById(userId)
      res.send({ message: "User deleted successfully" })
    } catch (err) {
      res.status(400).send({ message: err.message })
    }
  })
}

export default usersRoute
