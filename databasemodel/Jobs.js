const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize(
    'ringover',
    '24xZfAPYyGNHYDd.root',
    'sridhar143',
    {
        host : "gateway01.us-west-2.prod.aws.tidbcloud.com",
        port : 4000,
        dialect : 'mysql',
        dialectOptions: {
        ssl: {
           minVersion: 'TLSv1.2',
            rejectUnauthorized: true,
          },
        },
  },
);


sequelize.authenticate().then(()=>{
    console.log("Successfully connected")
}).catch((err)=>{
    console.log(err)
})

const Jobs = sequelize.define("jobs", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestamp: {
      type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    dependencies: {
      type: DataTypes.STRING,
      allowNull: true,
    }
 });
 
 ( async()=>{sequelize.sync().then(() => {
    console.log('Jobs table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 }); })()

 module.exports = Jobs
