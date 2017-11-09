const puppeteer = require('puppeteer')
const _ = require('lodash')

// Number of datasets currently listed on data.gov
async function main() {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://catalog.data.gov/dataset')
    const content = await page.evaluate(async () => {
      return document.querySelector('.new-results').textContent
    })

    await browser.close()

    const result = parseInt(
      _.trim(content)
        .split(' ')[0]
        .replace(',', '')
    )

    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

main()
