const puppeteer = require('puppeteer')

// The name of the most recently added dataset on data.gov
async function main() {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(
      'https://catalog.data.gov/dataset?q=&sort=metadata_created+desc'
    )
    const content = await page.evaluate(async () => {
      return document.querySelector('.dataset-heading a').textContent
    })

    await browser.close()

    console.log(content)
  } catch (error) {
    console.error(error)
  }
}

main()
