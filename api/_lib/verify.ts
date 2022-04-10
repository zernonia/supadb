import type { VercelRequest, VercelResponse } from "@vercel/node"

export default (req: VercelRequest, res: VercelResponse) => {
  const { authorization } = req.headers
  if (process.env.NODE_ENV !== "development" && authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).end("Unauthorized")
    return
  }
}
