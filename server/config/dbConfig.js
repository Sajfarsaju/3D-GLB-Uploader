const mongoose = require('mongoose')

module.exports = function mongooseConnection() {    
    mongoose.connect(process.env.MONGOOSE_CONNECTION,{
    
    })
    .then(()=>{
        console.log("DB CONNECTED")
    })
    .catch((err)=>{
        console.log("Error connecting to DB",err);
    })
}