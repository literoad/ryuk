const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer')

module.exports.handler = async (event, context) => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
  })
  const options = {
    logLevel: 'info',
    output: 'json',
    port: new URL(browser.wsEndpoint()).port,
  }
  const result = await lighthouse('https://journal.tinkoff.ru', options)

  const report = result.report
  console.log(report)

  console.log('Report is done for', result.lhr.finalUrl)
  console.log(
    'Performance score was',
    result.lhr.categories.performance.score * 100
  )

  await browser.close()
}
