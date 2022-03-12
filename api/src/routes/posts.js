import PostsModel from "../models/posts"
import UsersModel from "../models/users"

const postsRoute = ({ app }) => {
  app.post("/posts", async (req, res) => {
    const {
      body: { title, description, userId },
    } = req

    try {
      const user = UsersModel.query().findOne({ userId })

      if (!user) {
        res.status("401").send({ error: "user not found" })

        return
      }

      PostsModel.query().insertAndFetch(title, description, userId)
    } catch (err) {
      res.send(err)
    }
  })
}
