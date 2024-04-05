const { mcqQuestion, quizTitleModel } = require('../models/questions');
const userModel = require('../models/user')

const home = (req, res) => {
    if (req.credentials) {
        userModel.findOne({ email: req.credentials.email })
            .then((user) => {
                quizTitleModel.find({user:user._id})
                    .then((docs)=>{
                        res.render('home', { name: user.name,quizzs:docs })
                    }).catch((err)=>{
                        res.render('home',{ name: user.name })
                    })
                
            }).catch((err) => {
                throw new Error('Error while fetching req.credential')
            })

    } else {
        throw new Error('req.credential not accisible')
    }
}
const createQuizz = (req,res)=>{
    userModel.findOne({ email: req.credentials.email })
        .then((user) => {
            quizTitleModel.create({ quizzTitleName: req.body.quizzTitleName,user:user._id })
                .then(()=>{                    
                    res.redirect('/submitQuizz')
                })
})
}


const submitQuizz = (req, res) => {    
                    // mcqQuestion.create({
                    //     user: user._id,
                    //     questionBody: req.body.questionBody,
                    //     choices: req.body.option,
                    //     AnswerIndex: req.body.AnswerIndex,
                    //     quizzTitle: quizzTitleInstance._id,
                    // })
                    res.redirect('/home')

}


module.exports = { createQuizz, home, submitQuizz };