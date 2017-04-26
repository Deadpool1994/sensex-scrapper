
const fs = require("fs");
const redis = require("redis");
const request = require("tinyreq");
const cheerio = require("cheerio");

let client = redis.createClient();
client.on('connect',()=>{
  console.log('redis is started...');
});

request("http://www.moneycontrol.com/india/stockpricequote/", function (err, body) {
    fs.writeFile('stocks','',function(err){
      if(err){
        return console.log('page not found...');
      }
      $ = cheerio.load(body);
      $('.pcq_tbl.MT10 td').each(function(){
        let stock_name = $(this).text().trim();
        let stock_url = $($(this).find('a')).attr('href');
      //  console.log(stock_name+"--"+stock_url);
        client.hmset(stock_name,[
          'stock_url',stock_url
        ],function(err,reply){
          if(err){
            console.log(err);
          }else{

          }
        });
        fs.appendFile('stocks',$(this).text().trim()+ '\r\n',(err)=>{
          if(err){
            return console.log('stocks');
          }
        });
      });
      getObject("Arvin");
    });

});

var getObject = (stock_name) => {
  client.hgetall(stock_name, function(err, obj){
    if(!obj){
      console.log('cannot find stock');
    }else{
      console.log(obj);
      //getStockValue(obj.stock_url)
    }
  });
};

var getStockValue = (stock_url)=>{
  request(stock_url, function (err, body) {
    $ = cheerio.load(body);
    let stockData = $('.stockDtl');
    let BSE_data = $(stockData).find('#Bse_Prc_tick strong').text();
    let NSE_data = $(stockData).find('#Nse_Prc_tick_div strong').text();
    console.log(`BSE_data = ${BSE_data} -- NSE_data =${NSE_data}`);
  });
};
