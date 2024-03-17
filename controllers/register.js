const userModel = require('../models/user')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const register = (req,res,next)=>{
    const token = uuidv4();
    res.cookie('token',token,{httpOnly:true})
    res.render('auth',{'token':token})    
}


module.exports = {register};