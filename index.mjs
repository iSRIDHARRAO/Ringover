import express from 'express';
import dotenv from 'dotenv';
import producer1 from './producer1.js';
import producer2 from './producer2.js';
import bodyParser from 'body-parser';

import redis from 'redis';
//redis
const client = redis.createClient({
   socket : {
     host : '<redis-host>',
     port : '<redis-port>',

},
    password : '<redis-password>',
   
})
//await client.connect();
client.on('connect',function (){

  console.log("Redis connected Successfully...!")
})

const app = express()
dotenv.config()
const PORT = 3010

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//get scheduled tasks api
app.get('/get_tasks',async (req,res)=>{
client.connect()  
const val= await client.lRange('job',0,-1)
   console.log(val) 
   res.send(val)
}
)


//message post api
app.post('/msg/add-post',(req,res)=>{
    var data = req.body;
    console.log(data)
    producer1(JSON.stringify(data))
    res.send("OK")
})

//mail post api
app.post('/mail/add-post',(req,res)=>{
    var data = req.body;
    console.log(data)
    producer2(JSON.stringify(data))
    res.send("OK")
})

// default home api
app.get('/',(req,res)=>{
    res.send("It Works....")
})
app.listen(process.env.PORT || PORT ,()=>{
console.log("Started server at port :-",process.env.PORT || PORT)



})
