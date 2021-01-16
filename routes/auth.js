
const router= require('express').Router()

const handle=require('../handlers')





router.post('/register',handle.authHandlers.register);
router.post('/login',handle.authHandlers.login)
module.exports=router