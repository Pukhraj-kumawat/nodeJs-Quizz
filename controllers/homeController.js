const { mcqQuestion, quizTitleModel,userQuizz } = require('../models/questions');
const userModel = require('../models/user')

const home = (req, res) => {
    if (req.credentials) {
        userModel.findOne({ email: req.credentials.email })
            .then((user) => {
                let jsObject0 = {};
                let jsObject = {};
                quizTitleModel.find({user:user._id})
                    .then((quizzTitles)=>{                                                  
                        // let quizzTitles = [...docs]

                        // res.send(quizzTitles)
                        const fun = async () => {

                            for (const quizzTitle of quizzTitles) {
                                try {                                                                    
                                    const mcqQuestions = await mcqQuestion.find({ quizzTitle: quizzTitle._id });                                    
                                    let mcqQuestionsArray = [...mcqQuestions];                                    
                                    jsObject[quizzTitle._id] = mcqQuestionsArray;                                    
                                    jsObject0[quizzTitle._id] = quizzTitle.quizzTitleName
                                } catch (error) {
                                    console.error(error);
                                }
                            }


                            // res.send(jsObject)                            
                            res.render('home', { name: user.name,jsObject:jsObject,jsObject0:jsObject0})
                        };                                                                                                             fun()
                        
                        
                      
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
                    res.redirect('/home')
                })
})
}


const submitQuizz = (req, res) => {   
    userModel.findOne({ email: req.credentials.email })
        .then((user)=>{            
            mcqQuestion.find({quizzTitle:req.body.quizzTitleId})
                .then((questions)=>{
                    let array = []
                    questions.forEach((question)=>{
                         const selectedIndex = req.body[question._id]
                        //  var obj = {};
                        //  obj[question._id] = selectedIndex;
                         array.push({referencedObject:question._id,selectedIndex:selectedIndex});
                    })
                
                    userQuizz.create({
                        user:user._id,
                        quizzTitle:req.body.quizzTitleId,
                        questions:array
                    }).then((createUser)=>{
                        res.send("User quizz created")
                    })
                })
        })

}

const createMcq = (req,res)=>{
    userModel.findOne({ email: req.credentials.email })
        .then((user)=>{
            mcqQuestion.create({
                user: user._id,
                questionBody: req.body.questionBody,
                choices: req.body.option,
                AnswerIndex: req.body.AnswerIndex,
                quizzTitle: req.body.quizzId,
            }).then(()=>{
                res.redirect('/home')
            })
        })
    
}


const quizzHome = (req,res)=>{
    userModel.findOne({ email: req.credentials.email })
        .then((user)=>{
            quizTitleModel.find({})
            .then((quizzs)=>{
                res.render('quizzHome',{user:user,quizzs:quizzs})
            })
        })

}

const takeQuizz = (req,res)=>{
    userModel.findOne({ email: req.credentials.email })
        .then((user)=>{
            quizTitleModel.findOne({_id:req.body.quizzId})
                .then((quizz)=>{                    
                    mcqQuestion.find({quizzTitle:req.body.quizzId})
                        .then((Questions)=>{
                            res.render('takeQuizz',{user:user,quizzTitle:quizz,Questions:Questions})
                        })
                })
        })
}



const yourQuizz = (req, res) => {
    userModel.findOne({ email: req.credentials.email })
        .then((user) => {
            let array = [];
            userQuizz.find({ user: user._id })
                .then((quizzs) => {


                    const promises = quizzs.map((quizz) => {
                        return quizTitleModel.findOne({ _id: quizz.quizzTitle })
                            .then((quizzTitleInstance) => {
                                array.push(quizzTitleInstance);
                            });
                    });
                    return Promise.all(promises)
                        .then(() => {
                            res.send(array);
                        });


                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send("Internal Server Error");
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
};


// const yourQuizzInfo = (req,res)=>{  
//     quizTitleModel.findOne({_id:req.query.id})
//         .then((quizzTitle)=>{
//              userQuizz.findOne({quizzTitle:req.query.id})
//                 .then((userQuizzInstance)=>{   
//                     // res.send(userQuizzInstance.questions);
//                     const promisesArray = (userQuizzInstance.questions).map((question)=>{
//                         return mcqQuestion.findOne({_id:question.referencedObject})
//                             .then((mcqQuestionInstance)=>{
//                                 let object = {mcqQuestionInstance:question.selectedIndex}                                
//                                 res.write(`data: ${JSON.stringify(object)}\n\n`);
//                                 // console.log('gone');                              
//                             })
//                     })                    
//                     return Promise.all(promisesArray)
//                         .then(()=>{
//                             res.render('yourQuizz',{quizzTitle:quizzTitle,userQuizz:userQuizz})
//                         }) 
//                 }).catch((err)=>{
//                     res.send(err)
//                 })

                
//         })  
        
// }

const yourQuizzInfo = (req,res)=>{
    userModel.findOne({ email: req.credentials.email })
        .then((user) => {
            const promises = []
            const arr = [];
            userQuizz.findOne({quizzTitle:req.query.id,user:user})
                .then((userQuizz)=>{
                    userQuizz.questions.forEach((ob)=>{
                        const promise = mcqQuestion.findById(ob.referencedObject)
                                .then((mcqQuestionInstance)=>{
                                    arr.push({referencedInstance:mcqQuestionInstance,selectedIndex:ob.selectedIndex})
                                })                        
                        promises.push(promise)                        

                    })
                    Promise.all(promises)
                        .then(()=>{
                            quizTitleModel.findById(req.query.id)
                                .then((quizzTitle)=>{
                                    // res.send(arr)
                                    res.render('yourQuizz',{quizzTitle:quizzTitle,arr:arr})
                                })
                            
                        })
                })
                
        })
}




module.exports = { createQuizz, home, submitQuizz,createMcq ,quizzHome,takeQuizz,yourQuizz,yourQuizzInfo};