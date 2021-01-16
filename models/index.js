require('dotenv').config
const mongoose=require('mongoose')

//mongoose.set('debug',true)
mongoose.Promise=global.Promise;
console.log("ffffff+   "+process.env.URL)
mongoose.connect(process.env.URL)

module.exports.User=require('./user')
module.exports.Poll=require('./poll')
