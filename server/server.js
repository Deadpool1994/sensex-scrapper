console.log('hello world');
console.log('hahahaha');

const request = require("tinyreq");
const cheerio = require("cheerio");

request("http://www.moneycontrol.com/india/stockpricequote/", function (err, body) {
    console.log(err || body); // Print out the HTML
    $ = cheerio.load(body);
    console.log($('.pcq_tbl.MT10').html());
});
