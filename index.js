require('dotenv').config

const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const handler=require('./handlers');
const db=require('./models')
const routes=require('./routes')

const app=express()
const obj={
    hello:'worl d'
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/api/auth',routes.auth)

app.use('/api/poll',routes.poll)

app.use(cors())


app.use(handler.notFound)



app.use(handler.errorHandler)




app.get('/',(req,res)=>{

    res.send(obj)
})


app.listen(process.env.PORT||4000,()=>{

console.log('Server started on port 4000')

})