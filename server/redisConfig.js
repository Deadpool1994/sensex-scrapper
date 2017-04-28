const redis = require("redis");


let client = redis.createClient(process.env.REDIS_URL);
client.on('connect',()=>{
  console.log('redis is started...');
});

var getRedisClient = ()=>{
  return client;
};

module.exports = {
  getRedisClient
}
