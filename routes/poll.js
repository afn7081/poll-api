const router=require('express').Router();

const handle=require('../handlers')
const auth =require('../middleware/auth')



router.route('/')
.get(handle.showPolls)
.post(auth,handle.createPoll)

router.get('/user',auth,handle.userPolls)

 router.route('/:id')
 .get(handle.getPoll)
.delete(auth,handle.deletePoll)
.post(auth,handle.vote)
module.exports=router