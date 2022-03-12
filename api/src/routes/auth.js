import jsonwebtoken from "jsonwebtoken"
import hashPassword from "../middleware/hashPassword.js"
import UsersModel from "../models/users.js"
import config from "../config.js"
const authRoute = ({ app }) => {
  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await UsersModel.query().findOne({ email })

    if (!user) {
      res.status("401").send({ error: "email or password invalid" })

      return
    }
    const [hashedPassword] = hashPassword(password, user.passwordSalt)
    if (hashedPassword != user.passwordHash) {
      res.status("401").send({ error: "email or password invalid" })

      return
    }

    const jwt = jsonwebtoken.sign(
      { payload: { userId: user.id } },
      config.security.session.secret,
      { expiresIn: config.security.session.expiresIn }
    )

    res.send(jwt)
  })

  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    try {
      const [passwordHash, passwordSalt] = hashPassword(password)

      const user = await UsersModel.query().insertAndFetch({
        email,
        passwordHash,
        passwordSalt,
      })

      res.send(user)
    } catch (err) {
      res.status("404").send({ erreur: err })
    }
  })
}
export default authRoute
