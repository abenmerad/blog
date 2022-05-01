import express from "express"
import knex from "knex"
import { Model } from "objection"
import cors from "cors"
import config from "./src/config.js"
import authenticationRoute from "./src/routes/authentication.js"
import usersRoute from "./src/routes/users.js"
import postsRoute from "./src/routes/posts.js"
import commentsRoute from "./src/routes/comments.js"
import pendingApplicationRoute from "./src/routes/pendingApplication.js"
const app = express()
const db = knex(config.db)

Model.knex(db)

app.use(
  cors({
    origin: process.env.WEB_APP_ORIGIN,
  })
)
app.use(express.json())

usersRoute({ app })
authenticationRoute({ app })
postsRoute({ app })
commentsRoute({ app })
pendingApplicationRoute({ app })
app.listen(config.port, () => console.log(config.port))
