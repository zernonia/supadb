import { supabase } from "./_lib/supabase"
import { initPage } from "./_lib/chromium"
import type { VercelRequest, VercelResponse } from "@vercel/node"
import verify from "./_lib/verify"

export default async (req: VercelRequest, res: VercelResponse) => {
  verify(req, res)
  var hrstart = process.hrtime()
  const { query } = req

  if (!query.genre || !query.start) {
    res.status(400).end("No genre or start position found")
    return
  }

  try {
    const page = await initPage()
    await page.goto(`https://www.imdb.com/search/title/?genres=${query.genre}&start=${query.start}`)
    await page.waitForSelector(".lister-list")

    await page.waitForSelector(".loadlate")
    let data = await page.$$eval(".lister-item", (item) => {
      // Extract the item from the data
      return item.map((el) => {
        let link = "https://www.imdb.com" + el.querySelector(".lister-item-image a")?.getAttribute("href")
        let id = link.match(/title\/(.*?)\//i)?.[1]
        let image =
          el.querySelector(".lister-item-image img")?.getAttribute("loadlate") ??
          el.querySelector(".lister-item-image img")?.getAttribute("src")
        let title = (el.querySelector(".lister-item-header a") as HTMLElement)?.innerText ?? null
        let year =
          (el.querySelector(".lister-item-header .lister-item-year") as HTMLElement)?.innerText.replace(
            /[()\ \s-]+/g,
            ""
          ) ?? null
        let certificate = (el.querySelector(".certificate") as HTMLElement)?.innerText ?? null
        let duration = el.querySelector(".runtime")
          ? +(el.querySelector(".runtime") as HTMLElement)?.innerText.replace(" min", "")
          : null
        let genre = (el.querySelector(".genre") as HTMLElement)?.innerText.split(", ") ?? null
        let rating = +(el.querySelector(".ratings-imdb-rating") as HTMLElement)?.innerText ?? null
        let metascore = +(el.querySelector(".metascore") as HTMLElement)?.innerText ?? null
        let description = (el.querySelector(".lister-item-content p:nth-child(4)") as HTMLElement)?.innerText ?? null
        let vote = el.querySelector(".sort-num_votes-visible span:nth-child(2)")
          ? +(el.querySelector(".sort-num_votes-visible span:nth-child(2)") as HTMLElement)?.innerText.replace(/,/g, "")
          : null

        return { id, image, link, title, year, certificate, duration, genre, rating, metascore, description, vote }
      })
    })
    const result = await supabase.from("imdb").upsert(data)
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
// Comedy
// Sci-Fi
// Horror
// Romance
// Action
// Thriller
// Drama
// Mystery
// Crime
// Animation
// Adventure
// Fantasy
// Comedy-Romance
// Action-Comedy
// Superhero
