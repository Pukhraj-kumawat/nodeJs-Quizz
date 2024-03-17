const { default: mongoose } = require('mongoose');
const userModel = require('../models/user')
const bcrypt = require('bcrypt');



const signUp = (req, res) => {

    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {                        
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {                    
                    if (!err) {
                        const newUser = new userModel({
                            name: req.body.name,
                            email: req.body.email,
                            password: hashedPassword
                        })
                        if(req.body.token === req.cookies.token){
                        newUser.save()
                            .then(() => {
                                res.send('Successfull!')
                            }).catch((err) => {
                                res.send(err)
                            })
                        } else{
                            res.send('token not verified')
                        }
                    }
                })
            }
        }
    })
}


const login = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    userModel.findOne({'email':email})
        .then((document)=>{
            if(req.body.token === req.cookies.token){
            bcrypt.compare(password,document.password,(err,result)=>{                
                if(result){
                    res.send('Logged in succesffull')
                } else{
                    res.send('Authentication failed')
                }
            })
        } else{
            res.send('Token verification failed')
        }
        }).catch((err)=>{
            console.log(err)
            res.send('some error while fetching document')
        })
}



module.exports = {signUp,login}