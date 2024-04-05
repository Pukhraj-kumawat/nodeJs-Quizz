const { default: mongoose } = require('mongoose');
const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const {createJwt,verifyJwt} = require('../middlewares/jwtMiddleware');
require('dotenv').config()


const signUp = (req, res) => {    
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (!err) {                                                                     
// Create new user instance                        
                        const newUser = new userModel({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        })
                        if (req.body.registerToken === req.cookies.registerToken) {
                            newUser.save()
                                .then(() => {                                    
                                    res.redirect('/home')
                                }).catch((err) => {
                                    res.send(err)
                                })
                        } else {
                            res.send('registerToken not verified')
                        }
                    }
                })
            }
        }
    })
}


const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    userModel.findOne({ 'email': email })
        .then((document) => {
            if (req.body.registerToken === req.cookies.registerToken) {
                bcrypt.compare(password, document.password, (err, result) => {
                    if (result) {                           
                        res.redirect('/home')
                    } else {
                        res.send('Authentication failed')
                    }
                })
            } else {
                res.send('registerToken verification failed')
            }
        }).catch((err) => {
            console.log(err)
            res.send('some error while fetching document')
        })
}

const logout = (req,res)=>{
    if(req.cookies.jwtToken){
        res.clearCookie('jwtToken');
        res.redirect('/register')
    }else{
        throw new Error('You are not logged in yet')
    }
}

module.exports = { signUp, login ,logout}