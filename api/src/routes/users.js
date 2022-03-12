import hashPassword from "../middleware/hashPassword.js"
import UsersModel from "../models/users.js"
import auth from "../middleware/auth.js"

const usersRoute = ({ app }) => {
  app.get("/users", async (req, res) => {
    const user = await UsersModel.query()
    res.send(user)
  })

  app.get("/users/:userId", auth, async (req, res) => {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req

    if (Number(userId) != sessionUserId) {
      res.status(403).send({ error: "access denied" })

      return
    }

    const user = await UsersModel.query().findById(userId)
    res.send(user)
  })
}

export default usersRoute
