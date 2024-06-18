const jwt = require('jsonwebtoken')
require('dotenv').config();


const createJwt = (req,res,next)=>{    

    const payload = {
        email:req.body.email
    };    
    
    jwtToken = jwt.sign(payload,process.env.MONGO_SECRET_KEY,{expiresIn:'1d'})           
    res.cookie('jwtToken',jwtToken,{httpOnly:true})    
    next()
    
}

const verifyJwt = (req,res,next)=>{   
    try {
        decoded = jwt.verify(req.cookies.jwtToken,process.env.MONGO_SECRET_KEY); 
        if(decoded){
            req.credentials = decoded;
            next();
        } else{            
            throw new Error('Something went wrong while verifiying jwt')            
        }   
    } catch (error) {
        res.status(401).json(error)
    } 
    
   
}


module.exports = {createJwt,verifyJwt};