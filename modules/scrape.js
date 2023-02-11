'use strict';

const axios = require("axios");
const cheerio = require("cheerio");
const prompt = require('prompt-sync')();
let rI = require('./requestsIntercept.js');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function search(url){
  await axios
  .get(url)
  .then((response) => {
    let $ = cheerio.load(response.data);
    let titles = [];
    let links = [];
    $('ul.items','div.last_episodes').find('li > p > a').each(function (index, element) {
      links.push("https://ww4.gogoanimes.org/ajaxajax/load-list-episode?ep_start=0&ep_end=&id=0&default_ep=&alias="+$(element).attr('href'));
    });    
    $('ul.items','div.last_episodes').find('li > p > a').each(function (index, element) {
      titles.push($(element).attr('title'));
    });
    for (let i = 0; i < titles.length; i++) {
      console.log(`${i+1}. ${titles[i]}`);
    }
    //Choice
    let choice = readline.question('Enter the number of the anime you want to download: ', async (choice) => {
      console.log(`You chose ${titles[choice-1]}`);
      let titleUrl = links[choice-1];
      await download(titleUrl);  
      readline.close();
    });
  })
  .catch((err) => console.log("Fetch error " + err));
}
async function download(titleUrl){
  await axios
  .get(titleUrl)
  .then((response) => {
    let $ = cheerio.load(response.data);
    let links = [];
    $('#episode_related li').each(function(i, elm) {
      let endpoint = $(elm).find('a').attr('href');
      links.push("https://ww4.gogoanimes.org"+ endpoint.trim());
    });
    let fixedLinks = [];
    for (let i = 0; i < links.length; i++) {
      fixedLinks.push(links[links.length-i])
    }
    //Choice
    console.log(`There are ${links.length} episodes`)
    let choice = prompt('Enter the number of the episode you want to download: ');
    console.log(`You chose ${fixedLinks[choice]}`);
    rI.reqIntercept(fixedLinks[choice]);
  })
  .catch((err) => console.log("Fetch error " + err));
}

module.exports = {
    search,
    download
}