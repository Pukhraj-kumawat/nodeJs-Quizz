const mongoose = require('mongoose')

const mcqSchema = new mongoose.Schema(
    {
        questionBody:{
            type:String,
            required:true
        },
        choices:{
            type:['String'],
            required:true,
            validate:{
                validator:(choices)=>{
                    return choices.length > 1;
                },
                message: 'At least one choice must be provided'
            },
            AnswerIndex:{
                type:Number,
                required:true,
                min:0
            }

        }
    }
)

const mcqQuestion = mongoose.model('mcqQuestion',mcqSchema);

module.exports = mcqQuestion;