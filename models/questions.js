const mongoose = require('mongoose')
const userModel = require('./user')

const quizzTitle = new mongoose.Schema(
    {
        quizzTitleName: {
            type: 'String',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: true
        }

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
        AnswerIndex: {
            type: String,
            required: true,                
        },
        quizzTitle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'quizzTitle',
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: true
        }

    }
)

const mcqQuestion = mongoose.model('mcqQuestion', mcqSchema);
const quizTitleModel = mongoose.model('quizzTitle',quizzTitle)

module.exports = {mcqQuestion,quizTitleModel};