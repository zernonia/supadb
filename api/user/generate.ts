import type { VercelRequest, VercelResponse } from "@vercel/node"
import jwt from "jsonwebtoken"
import { supabase } from "../_lib/supabase"

export default async (req: VercelRequest, res: VercelResponse) => {
  const { body } = req
  if (req.method !== "POST") {
    res.status(404).end("Not allowed")
    return
  }

  if (!body?.id) {
    res.status(400).end("No id is found")
    return
  }

  try {
    const result = await supabase.from("secrets").select("*").eq("user_id", body.id).single()

    if (result.error) throw new Error(result.error.message)

    const token = jwt.decode(process.env.VITE_SUPABASE_ANON as string) as any
    if (token) {
      token.secret = result.data.secret
    }

    const newToken = jwt.sign(token, process.env.VITE_SUPABASE_JWT_SECRET as string)

    res.json({
      key: newToken,
    })
  } catch (err) {
    console.log({ err })
    res.status(500).end(err)
  }
}
