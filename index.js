const lighthouse = require("lighthouse");
const puppeteer = require("puppeteer");

module.exports.handler = async (event) => {
  console.log("Received a new request", event);

  const body = JSON.parse(event.body);

  if (!body.url) {
    throw new Error('"url" field is required');
  }

  console.log("Starting browser...");
  const browser = await puppeteer.launch({
    defaultViewport: null,
  });
  console.log("Started browser!");

  const options = {
    output: "json",
    port: new URL(browser.wsEndpoint()).port,
  };

  console.log("Starting Lighthouse...");
  const result = await lighthouse(body.url, options);
  console.log("Lighthouse finished auditing the page!");

  console.log("Report is done for", result.lhr.finalUrl);

  await browser.close();

  return {
    statusCode: 200,
    body: result.report,
  };
};
