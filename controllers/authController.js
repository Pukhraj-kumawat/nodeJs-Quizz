const { default: mongoose } = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { createJwt, verifyJwt } = require("../middlewares/jwtMiddleware");
require("dotenv").config();

const signUp = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error generating salt' });
      }
      
      if (req.body.password !== req.body.confirm_password) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
  
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error hashing password' });
        }

        const newUser = new userModel({
          name: req.body.first_name + ' ' +req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
        });
  
        newUser.save()
          .then((user) => {
            res.status(200).json({message:"success"});
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: 'Error saving user' });
          });
      });
    });
  };
  



const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  userModel
    .findOne({ email: email })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).json({message:"success"});
        } else {
          res.status(401).json({ error: 'Incorrect password' });

        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.send("some error while fetching user");
    });
};

const logout = (req, res) => {
  if (req.cookies.jwtToken) {
    res.clearCookie("jwtToken");
    res.redirect("/register");
  } else {
    throw new Error("You are not logged in yet");
  }
};

module.exports = { signUp, login, logout };
