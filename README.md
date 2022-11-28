# Ringover Backend Task 

## Architecture 
![Architecture Image](https://github.com/iSRIDHARRAO/Ringover/blob/main/RingOver.png)
## Tools used :-
### Node JS as JavaScript Runtime.
### RabbitMQ as Message broker between processes.
### TiDB cloud to launch MYSQL cluster
### Redis to store scheduled jobs in memory queue
### Sequelize ( Node js ORM )
### Amazon Web Services EC2 instance to deploy complete application, rabbitmq and redis

# End points to post jobs and get scheduled jobs list

### http://13.127.136.254:3011/get_tasks to get scheduled tasks

### http://13.127.136.254:3011/msg/add-task to post jobs from msg service with name,priority and dep( dependencies ) are required fields and timestamp is optional.

### http://13.127.136.254:3011/mail/add-task to post jobs from mail service with name,priority and dep( dependencies ) are required fields and timestamp is optional.
