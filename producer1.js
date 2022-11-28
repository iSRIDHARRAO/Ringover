var amqp = require('amqplib/callback_api');

const producer1 = (msg) => {
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';
   //var msg = JSON.stringify(msg)

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent Message %s", msg);
  });

setTimeout(function() {
  connection.close();

  }, 500);

});

}


module.exports = producer1
