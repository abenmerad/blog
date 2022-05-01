const checkSession = (req, res, next) => {
  if (req.method === "GET") {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req

    if (!userId || !sessionUserId) {
      res.status("401").send({ error: "An error has occured" })

      return
    }
    if (Number(userId) != sessionUserId) {
      res.status(403).send({ error: "Access Denied" })

      return
    }
  }

  if (req.method === "DELETE") {
    const {
      params: { userId },
      session: { userId: sessionUserId },
    } = req

    if (
      typeof userId !== "undefined" &&
      Number(sessionUserId) != Number(userId)
    ) {
      res.status(403).send({ error: "Access Denied" })

      return
    }
  }

  const {
    body: { userId: bodyUserId },
    session: { userId: sessionUserId },
  } = req
  console.log({ bodyUserId, sessionUserId })
  if (sessionUserId != bodyUserId) {
    res.status(403).send({ error: "Access Denied" })

    return
  }

  next()
}
export default checkSession
