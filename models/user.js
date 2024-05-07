const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Must provide name'],
        maxlength: [20, 'name can not be more than 20 characters'],
    },

    password:{
        type:String,
        required:[true,'Must provide password'],
        validate:{
            validator:(value)=>{
                const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
                const hasNumber = /[0-9]+/.test(value);
                return hasSpecialCharacter || hasNumber;
            },
            message:(error) => {return `Password must contain at least one special character or one number`}

        }
    },
    email:{
        type:String,
        required:[true,'Must provide name'],
        unique:true,
        validate:{
            validator:(value)=>{
                const isEmail = /[0-9,a-z,A-Z]+@[0-9,a-z,A-Z]+\.com/.test(value);
                return isEmail;
            },
            message:(error)=>{return 'Email is not valid'}
        }
    }
})


const userModel = mongoose.model('User', user);

module.exports = userModel;