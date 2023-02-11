'use strict';

const puppeteer = require('puppeteer');
const request_client = require('request-promise-native');
const videoRip = require('./videoRip.js');
async function reqIntercept(epiUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let result = [];

  await page.setRequestInterception(true);

  page.on('request', request => {
    request_client({
      uri: request.url(),
      resolveWithFullResponse: true,
    }).then(response => {
      const requestUrl = request.url();
      result.push(requestUrl);
      request.continue();
      let finalElement = result[result.length - 1];
      let mp4 = [];
      if (finalElement.includes('https://ww1.9anime2.com/embed/')) {
        mp4.push(finalElement);
        videoRip.videoRip(mp4[0]);
        //console.log(mp4);
    }
    }).catch(error => {
      request.abort();
    });
  });
  await page.goto(epiUrl, {
    waitUntil: 'networkidle0',
  });

  await browser.close();
}


module.exports = {
  reqIntercept
}