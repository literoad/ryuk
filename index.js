const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer')

module.exports.handler = async (event, context) => {
  console.log('Received a new request', event)

  if (!event.url) {
    throw new Error('"url" field is required')
  }

  console.log('Starting browser...')
  const browser = await puppeteer.launch({
    defaultViewport: null,
  })
  console.log('Started browser!')

  const options = {
    output: 'json',
    port: new URL(browser.wsEndpoint()).port,
  }

  console.log('Starting Lighthouse...')
  const result = await lighthouse(event.url, options)
  console.log('Lighthouse finished auditing the page!')

  const report = result.report
  console.log(report)

  console.log('Report is done for', result.lhr.finalUrl)
  console.log(
    'Performance score was',
    result.lhr.categories.performance.score * 100
  )

  await browser.close()
}
