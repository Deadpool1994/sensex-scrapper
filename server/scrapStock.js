const request = require("tinyreq");
const cheerio = require("cheerio");
const redisConfig = require('./redisConfig.js');

var startStockScrapping = ()=>{
  var client = redisConfig.getRedisClient();
  request("http://www.moneycontrol.com/india/stockpricequote/", function (err, body) {
    $ = cheerio.load(body);
    $('.pcq_tbl.MT10 td').each(function(){
      let stock_name = $(this).text().trim().toLowerCase();
      let stock_url = $($(this).find('a')).attr('href');

      client.hmset(stock_name,[
        'stock_url',stock_url
      ],function(err,reply){
          if(err){
            console.log(err);
          }else{
            //console.log("data inserted ",reply);
          }
        });
      });
  });


};

module.exports = {
  startStockScrapping
};
