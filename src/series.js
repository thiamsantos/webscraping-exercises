require('make-promises-safe')
const fs = require('fs')
const path = require('path')
const url = require('url')
const pMap = require('p-map')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function getPage(url) {
  console.info(`GET ${url}`)
  const response = await fetch(url)
  return response.text()
}

const mapper = file => async link => {
  const page = await getPage(link)
  const $ = cheerio.load(page)
  const originalTitle = $('.originalTitle')

  const titleElement = originalTitle.length
    ? originalTitle
    : $('.title_wrapper h1')

  const content = titleElement
    .text()
    .replace('(original title)', '')
    .trim()

  file.write(content + '\n')
}

async function listLinks() {
  const BASE_URL = 'http://www.imdb.com/chart/toptv/?ref_=nv_tvv_250_3'
  const page = await getPage(BASE_URL)
  const $ = cheerio.load(page)
  return $('.titleColumn a')
    .map((i, el) => url.resolve(BASE_URL, $(el).attr('href')))
    .get()
}

async function main() {
  try {
    const links = await listLinks()
    const file = fs.createWriteStream(path.resolve(__dirname, './file.txt'))
    await pMap(links, mapper(file), {concurrency: 10})
    file.end()
  } catch (error) {
    console.error(error)
  }
}

main()
