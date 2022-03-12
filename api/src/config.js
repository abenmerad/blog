import dotenv from "dotenv"
dotenv.config()

const config = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    migrations: {
      stub: "./src/db/migration.stub",
    },
  },
  security: {
    pepper: process.env.PASSWORD_SECURITY_PEPPER,
    keylen: 128,
    iterations: 100000,
    digest: "sha256",
    session: {
      expiresIn: "2 days",
      secret: process.env.SESSION_SECRET,
    },
  },
}

export default config
