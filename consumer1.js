//imports
const amqp = require('amqplib/callback_api');
const Jobs = require('./databasemodel/Jobs')
const scheduler = require('./scheduler');
const Sequelize1 = require('sequelize');
const redis = require('redis'); 
//global variables
var taskarray = []
var target = 0

///redis 
const client = redis.createClient({
 socker:{
   host : '<redis-host>',
   port : '<port-by_default-6379>'
},
   password: '<redis-authentication>',
 
})
client.connect();
client.on('connect',function (){
   console.log("Redis connected");
});
client.on('error',function(){
   console.log("Error on Redis");
})

////server
const Sequelize = new Sequelize1(
    '<database_name>',
    '<tidb-user>',
    '<tidb-password>',
    {
        host : "<tidb-host>",
        port : "<tidb-portnumber>",
        dialect : 'mysql',
        dialectOptions: {
          ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
          },
        },
  },
);




///rabbitmq
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });
    Sequelize.authenticate().then(()=>{
      console.log("Successfully connected")
  }).catch((err)=>{
      console.log(err)
  })
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(queue, async function(msg) {



  
    var m = JSON.parse(msg.content.toString())
    taskarray=scheduler(taskarray,m)
    var name = m.name
    var priority = m.priority
    var timestamp = m.timestamp
    var dep = m.dep
    if(dep){
       const jobsss =  await Jobs.create({
            name: name,
            priority: priority,
            timestamp : timestamp,
            dependencies : dep
          })
          await jobsss.save();
        }
    else{
      const jobsss =  await Jobs.create({
        name: name,
        priority: priority,
        timestamp : timestamp,
        dependencies : "nill"
      })
      await jobsss.save();
    }
    //deleting redis array
    client.del('job')
    console.log("Final Task Array:")
    for(let i=0;i<taskarray.length;i++){
    client.rPush('job',taskarray[i]['name'])
    console.log(taskarray[i])

    
}
    
    
    }, {
        noAck: true
      });
      });
    });



