'use strict';
const axios = require("axios");
const prompt = require('prompt-sync')();
const rip = require('./ytDlpRip.js');

async function search(url){
  await axios.get(url)
    .then(res => {
      //console.log(res.data["0"]);
      let title = [];
      let id = [];
      let epCount = [];
      for (let i = 0; i < Object.keys(res.data).length; i++){
        title.push(res.data[i].title);
        id.push(res.data[i].id);
        epCount.push(res.data[i].episodesCount);
      }
      for (let i = 0; i < title.length; i++) {
        console.log(`${i+1}. ${title[i]}`);
      }
          let choice = prompt('Enter the number of the anime you want to download: ');

          console.log(`You chose ${title[choice-1]}`);
          let choiceIndex = choice - 1;
          console.log(`There are ${epCount[choiceIndex]} episodes`);
          let epNum = prompt('Enter the number of the episode you want to download: ');
          console.log(`You chose episode ${epNum}`);
          download(id[choice-1], epNum); 


    })

    .catch(err => {
      console.log(err);
    });
}
async function download(id, epNum){
  let titleUrl = `https://kisskh.me/api/DramaList/Drama/${id}`;
  await axios.get(titleUrl)
    .then(res => {
      let epIds = [];
      for (let i = 0; i < Object.keys(res.data.episodes).length; i++){
        epIds.push(res.data.episodes[i].id);
      }
      epIds.reverse();
      //let epiUrl = `https://kisskh.me/api/DramaList/Episode/${epIds[epNum-1]}.png?err=false&ts=&time=`;
      streamExtract(epIds[epNum-1]);
    });
}
async function streamExtract(epId){
  try {
    const response = await axios.get(`https://kisskh.me/api/DramaList/Episode/${epId}.png?err=false&ts=&time=`);
    rip.videoRip(response.data["Video"])
    console.log(response.data["Video"]);
  } catch (error) {
    console.error(error);
  }
        
}

module.exports = {
    search,
    download
}
