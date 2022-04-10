import { supabase } from "./_lib/supabase"
import { initPage } from "./_lib/chromium"
import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async (req: VercelRequest, res: VercelResponse) => {
  var hrstart = process.hrtime()
  const { query } = req
  const { authorization } = req.headers

  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    res.status(401).end("Unauthorized")
    return
  }

  if (!query.genre || !query.page) {
    res.status(400).end("No genre or page found")
    return
  }

  try {
    const page = await initPage()
    await page.goto(`https://store.steampowered.com/tags/en/${query.genre}/#p=${query.page}&tab=NewReleases`)

    await page.waitForSelector("#NewReleasesTable")
    await page.waitForNetworkIdle()
    await page.waitForTimeout(500)

    let data = await page.$$eval(
      "#NewReleasesRows > a",
      (item, query: any) => {
        // Extract the item from the data
        return item.map((el) => {
          let link = el.getAttribute("href")
          let id = Number(link?.match(/app\/(.*?)\//i)?.[1])
          let image = el.querySelector(".tab_item_cap_img")?.getAttribute("src") ?? null
          let title = (el.querySelector(".tab_item_name") as HTMLElement)?.innerText ?? null
          let price =
            +(el.querySelector(".discount_final_price") as HTMLElement)?.innerText?.replace(/[^\d.-]/g, "") ?? null
          let tags = (el.querySelector(".tab_item_top_tags") as HTMLElement)?.innerText.split(", ") ?? null
          let platforms = [
            el.querySelector(".platform_img.win") ? "Windows" : null,
            el.querySelector(".platform_img.mac") ? "Mac" : null,
            el.querySelector(".platform_img.linux") ? "Linux" : null,
          ].filter((i) => i)

          let genre = query.genre as string
          return { id, link, image, title, price, tags, platforms, genre }
        })
      },
      query
    )

    const result = await supabase.from("steam").upsert(data)
    if (result.error) throw new Error(result.error.message)

    var hrend = process.hrtime(hrstart)
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000)
    res.status(200).end("success")
  } catch (err) {
    console.log({ err })
    res.status(500).end(err)
  }
}

// ** Genre **
// Free to Play
// Early Access
// Action
// Adventure
// Casual
// Indie
// Massively Multiplayer
// Racing
// RPG
// Simulation
// Sports
// Strategy
