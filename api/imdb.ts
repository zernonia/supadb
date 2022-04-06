import type { VercelRequest, VercelResponse } from "@vercel/node"
import { initPage } from "./_lib/chromium"

var hrstart = process.hrtime()

export default async (req: VercelRequest, res: VercelResponse) => {
  const { query } = req

  if (!query.genre || !query.start) {
    res.statusCode = 400
    res.end("No genre or start position found")
  }

  try {
    const page = await initPage()
    await page.goto(`https://www.imdb.com/search/title/?genres=${query.genre}&start=${query.start}`)
    await page.waitForSelector(".lister-list")

    await page.waitForSelector(".loadlate")
    let urls = await page.$$eval(".lister-item", (item) => {
      // Extract the item from the data
      return item.map((el) => {
        let link = "https://www.imdb.com" + el.querySelector(".lister-item-image a")?.getAttribute("href")
        let id = link.substring(link.indexOf("title/") + 6, link.lastIndexOf("/"))
        let image =
          el.querySelector(".lister-item-image img")?.getAttribute("loadlate") ??
          el.querySelector(".lister-item-image img")?.getAttribute("src")
        let title = (el.querySelector(".lister-item-header a") as HTMLElement)?.innerText
        let year = (el.querySelector(".lister-item-header .lister-item-year") as HTMLElement)?.innerText.replace(
          /[()\ \s-]+/g,
          ""
        )
        let certificate = (el.querySelector(".certificate") as HTMLElement)?.innerText
        let duration = el.querySelector(".runtime")
          ? +(el.querySelector(".runtime") as HTMLElement)?.innerText.replace(" min", "")
          : undefined
        let genre = (el.querySelector(".genre") as HTMLElement)?.innerText.split(", ")
        let rating = +(el.querySelector(".ratings-imdb-rating") as HTMLElement)?.innerText
        let metascore = +(el.querySelector(".metascore") as HTMLElement)?.innerText
        let description = (el.querySelector(".lister-item-content p:nth-child(4)") as HTMLElement)?.innerText
        let vote = el.querySelector(".sort-num_votes-visible span:nth-child(2)")
          ? +(el.querySelector(".sort-num_votes-visible span:nth-child(2)") as HTMLElement)?.innerText.replace(/,/g, "")
          : undefined

        return { id, image, link, title, year, certificate, duration, genre, rating, metascore, description, vote }
      })
    })

    var hrend = process.hrtime(hrstart)
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000)
    res.json(urls)
  } catch (err) {
    res.statusCode = 500
    res.end(err)
  }
}
