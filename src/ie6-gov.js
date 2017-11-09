const fetch = require('node-fetch')
const _ = require('lodash')

// The number of people who visited a U.S. government website using Internet Explorer 6.0 in the last 90 days
async function main() {
  try {
    const response = await fetch('https://analytics.usa.gov/data/live/ie.json')
    const data = await response.json()
    const result = _.get(data, 'totals.ie_version[6.0]')
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

main()
