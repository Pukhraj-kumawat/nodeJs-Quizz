const mongoose = require('mongoose')
const userModel = require('./user')


const quizzSchema = new mongoose.Schema(
    {
        title:{
            type:'String',
            required:true,
            maxlength:[200,'The quizz title must be less than 200 characters']
        },
        description:{
            type:'String',
            required:false,
            maxlength:[500,'The quizz description must be less than 500 character']
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'userModel',
            required:true
        },
        questions:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'mcqSchema',
                required:true
            }
        ]
    }
)

const mcqSchema = new mongoose.Schema(
    {
        questionBody: {
            type: String,
            required: true
        },
        choices: {
            type: ['String'],
            required: true,
            validate: {
                validator: (choices) => {
                    return choices.length > 1;
                },
                message: 'At least one choice must be provided'
            },            
        },
        answerIndex: {
            type: Number,
            required: true,                
        },
        // quizz: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'quizzSchema',
        //     required: true,
        // },        

    }
)

const userQuizzSchema = new mongoose.Schema(
    {
        takenBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: true
        },
        quizz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizzSchema',
            required: true,
            unique:true
        },
        reference:[{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'mcqSchema',
                required:true
            },
            selectedIndex: {
                type:Number,                             
            },
            isExpired : {
                type:Boolean,
                default:false
            }
        }]

}

)

const question = mongoose.model('question', mcqSchema);
const quizz = mongoose.model('quizz',quizzSchema)
const userQuizz = mongoose.model('userQuizz',userQuizzSchema)


module.exports = {question,quizz,userQuizz};