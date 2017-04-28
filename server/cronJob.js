var CronJob = require('cron').CronJob;
var scrapStock = require('./scrapStock.js');

var startCronJob = ()=>{
  new CronJob('* * * * *', () => {
    console.log("scrapping stock");
    scrapStock.startStockScrapping();
  }, () => {
    console.log("stopping the cron job");
  },
  true,
  'America/Los_Angeles'
  );
};

module.exports = {
  startCronJob
};
