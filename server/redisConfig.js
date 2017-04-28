const redis = require("redis");


let client = redis.createClient();
client.on('connect',()=>{
  console.log('redis is started...');
});

var getRedisClient = ()=>{
  return client;
};

module.exports = {
  getRedisClient
}
