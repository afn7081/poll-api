require('dotenv').config()
const db=require('../models')
const bodyParser =require('body-parser')



const jwt=require('jsonwebtoken')



const register= async (req,res,next)=>{

    try{

        const user=await db.User.create(req.body);
        const {id,username}=user 

        const token=jwt.sign({id,username},process.env.SECRET)
        console.log("success " +req.body)
        res.status(201).json({id,username,token})
    }
    catch(err){
        console.log(err)
        if(err.code==11000){
            err.message='Sorry that username is already taken'
        }

        next(err)
    }
    
}

const login= async(req,res,next)=>{
try{

    const user=await  db.User.findOne({username: req.body.username})
    const {id,username}=user;

    const valid=await user.comparePassword(req.body.password);

    if(valid){
        
        const token=jwt.sign({id,username},process.env.SECRET)
        res.status(200).json({
            id,
            username,
            token
        })
    }

        else {
            throw new Error()
        }

}
catch(err){

    
    err.message='Invalid username or password'
    next(err)
}

}

module.exports.register=register
module.exports.login=login