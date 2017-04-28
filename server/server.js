const express = require("express");
const fs = require("fs");
const redis = require("redis");
const request = require("tinyreq");
const cheerio = require("cheerio");
const path = require('path');
const cronJob = require('./cronJob.js');
const redisConfig = require('./redisConfig.js');

const port = process.env.PORT || 4000;

const app = express();

let client = redisConfig.getRedisClient();

const publicPath = path.join(__dirname, '../public');
//app.use(express.static(publicPath));

app.get('/', (req,res)=> {
        var stock_data = getObject("Arvind",req,res);
        console.log(stock_data);
});

var getObject = (stock_name,req,res) => {
  client.hgetall(stock_name, function(err, obj){
    if(!obj){
      console.log('cannot find stock');
    }else{
      return getStockValue(obj.stock_url,req,res);
    }
  });
};

var getStockValue = (stock_url,req,res)=>{

    request(stock_url, function (err, body) {
      if(err){
        reject(err);
      }
      $ = cheerio.load(body);
      let stockData = $('.stockDtl');
      let BSE_data = $(stockData).find('#Bse_Prc_tick strong').text();
      let NSE_data = $(stockData).find('#Nse_Prc_tick_div strong').text();
      let stock_data = {
        'BSE_data': BSE_data,
        'NSE_data': NSE_data
      };
      //console.log(stock_data);
      res.send(stock_data);
    });
};

app.listen(port, function(){
  cronJob.startCronJob();
  console.log('application is running on ', port);
});
