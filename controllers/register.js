const userModel = require('../models/user')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const register = (req,res,next)=>{
    if(!('jwtToken' in req.cookies)){
    const registerToken = uuidv4();
    res.cookie('registerToken',registerToken,{httpOnly:true})
    res.render('auth',{'registerToken':registerToken}) 
    } else{
        res.send('You are already logged in')        
    }

};

module.exports = {register};