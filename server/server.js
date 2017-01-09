
const fs = require("fs");

const request = require("tinyreq");
const cheerio = require("cheerio");

request("http://www.moneycontrol.com/india/stockpricequote/", function (err, body) {
    fs.writeFile('stocks','',function(err){
      if(err){
        return console.log('stocks');
      }
      $ = cheerio.load(body);
      $('.pcq_tbl.MT10 td').each(function(){
        fs.appendFile('stocks',$(this).text().trim()+ '\r\n',(err)=>{
          if(err){
            return console.log('stocks');
          }
        });
      });
    })

});
