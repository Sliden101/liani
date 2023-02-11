#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();
let scrape = require('./modules/scrape.js');

program
  .name('liani')
  .description('CLI to download some anime')
  .version('1.0.0');

program.command('download')
  .description('Le download')
  .argument('<title>', 'search for anime to download')
  .action((str) => {
    scrape.search(`https://ww4.gogoanimes.org//search?keyword=${str}`);
  });
  
program.parse();