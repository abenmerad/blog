import express from "express"
import knex from "knex"
import { Model } from "objection"
import config from "./src/config.js"
import authRoute from "./src/routes/auth.js"
import usersRoute from "./src/routes/users.js"

const app = express()
const db = knex(config.db)
Model.knex(db)
app.use(express.json())

usersRoute({ app })
authRoute({ app })

app.listen(config.port, () => console.log(config.port))
