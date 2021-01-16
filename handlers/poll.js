const { Error } = require('mongoose');
const db=require('../models');
const { use, options } = require('../routes/auth');

exports.showPolls=async(req,res,next)=>{
    try {
        
        const polls=await db.Poll.find()

        res.status(200).json(polls); 
    } catch (err) {
        console.log('tf happened')

        err.status=400;

        next(err)
    }


}


exports.createPoll=async(req,res,next)=>{
    try {
        console.log(req.decoded)
        const {id}=req.decoded

        const user=await db.User.findById(id)
        console.log(user)
        const {question,options}=req.body 

        const poll=await db.Poll.create({
            question,
            user,
            options:options.map(option=>({
                option:option,votes:0
            }))
        })
        console.log("poll user: "+poll.user)
        user.polls.push(poll)
        await user.save()
        res.json({...poll._doc,user:user.id})
    } catch (err) {
        
        err.status=400;

        next(err)
    }


}


exports.userPolls= async (req,res,next)=>{

    try {
        
        const {id}=req.decoded;
        const user= await db.User.findById(id)
        .populate('polls')
        console.log(user.polls)
        res.status(200).json(user.polls)

    } catch (err) {
        console.log("error#######: "+err)
        err.status=400
        next(err)

    }
}


exports.getPoll=async (req,res,next)=>{

    try {

        const {id}=req.params;

        const poll=await db.Poll.findById(id).populate('user',['username','id']);

        if(!poll)throw new Error('No Poll found')

        res.status(200).json(poll);
        
    } catch (err) {
        err.status=404
        next (err)
    }


}



exports.deletePoll=async(req,res,next)=>{
    try {
        const {id:pollId}=req.params;
        const {id:userId}=req.decoded;

      const poll=  await db.Poll.findById(pollId)
        
      const user=  await db.UserfindById(pollId)
        

      console.log(poll)
      if(!poll)throw new Error('No poll Found')
      //check if user is athenicated or not  
      if(poll.user.toString()!==userId)throw new Error('unauthorized access')
        const userPolls=user.polls.filter((poll)=>{
            return poll._id.toString()!=pollId;
        })
       // db.User.updateOne({})
        await poll.remove()

        res.status(200).json(poll)

    } catch (err) {
        err.status=400
        next(err)
    }


}


exports.vote=async (req,res,next)=>{

    try {
        const {id:pollId}=req.params;
        const {id:userId}=req.decoded;
        const{answer}=req.body

        if(answer){
            const poll=await db.Poll.findById(pollId)
            if(!poll) throw new Error('No poll found')

            const vote=poll.options.map((option)    =>{

                if(option.option==answer)  return {
                    option:option.option,
                    _id:option._id,
                    votes:option.votes+1
                    
                } 
                else return option

            });
            if(poll.voted.filter((user)=> (user.toString()==userId)).length<=0){
                poll.voted.push(userId);
                poll.options=vote;

                await poll.save()

                res.status(202).json(poll)
            }else{
                throw new Error('Already voted')
            }
            
            
        }
        else{
            throw new Error('No answer Provided')
        }

    } catch (err) {
        err.status=400;
        next(err)
    }
}