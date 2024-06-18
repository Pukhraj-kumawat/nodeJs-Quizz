const { question, quizz, userQuizz } = require("../models/quizz");
const userModel = require("../models/user");

const home = async (req, res) => {
  try {
    //Fetch the user
    const user = await userModel.findOne({ email: req.credentials.email });
    //Fetch all quizzs created by user
    const createdQuizzsPromise = quizz.find({
      createdBy: user._id,
    });

    // Fetch all quizzs (exluding quizzs that i have taken and quizzs created by me)
    const yourQuizzs = await userQuizz.find({takenBy:user._id})

    const takenQuizzIds = yourQuizzs.map((yourQuizz) => yourQuizz.quizz);

    const allQuizzsPromise = quizz.find({
      createdBy: { $ne: user._id },
      _id: { $nin: takenQuizzIds },
    })


//  If not run
// const allQuizzsPromise = quizz.find({ createdBy: { $ne: user._id }})



    const [createdQuizzs, allQuizzs] = await Promise.all([
      createdQuizzsPromise,      
      allQuizzsPromise,
    ]);

    res.status(200).json({
      createdQuizzs: createdQuizzs,
      allQuizzs: allQuizzs,
      userInfo: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const createQuizz = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    question.insertMany(req.body.questions).then((questions) => {
      const questionIds = questions.map((q) => q._id);
      quizz
        .create({
          title: req.body.title,
          description: req.body.description,
          createdBy: user._id,
          questions: questionIds,
        })
        .then(() => {
          res.status(201).json({ message: "sucess" });
        });
    });
  });
};

const fetchQuestions = (req, res) => {
  try {
    const questionsPromises = req.body.questionsIds.map((id) =>
      question.findById(id)
    );
    Promise.all(questionsPromises)
      .then((questions) => {
        res.status(200).json(questions);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(404).json(error);
  }
};

const takeQuizz = async (req, res) => {
  try {
    const quizzInstance = await quizz.findById(req.body.quizzId);
    const questionsPromise = quizzInstance.questions.map((id) =>
      question.findById(id)
    );
    const questions = await Promise.all(questionsPromise);
    res.status(200).json({ questions: questions, quizz: quizzInstance });
  } catch (error) {
    res.status(404).json(error);
    console.log("this is the error", error);
  }
};

const submitQuizz = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    userQuizz
      .findOne({ takenBy: user._id, quizz: req.body.quizzId })
      .then((userQuizzDocument) => {
        const reference = {
          question: req.body.questionId,
          ...(req.body.selectedIndex !== undefined
            ? { selectedIndex: req.body.selectedIndex }
            : { isExpired: true }),
        };
        if (userQuizzDocument) {
          console.log("userquizz found");

          userQuizzDocument.reference = [
            ...userQuizzDocument.reference,
            reference,
          ];
          userQuizzDocument
            .save()
            .then((updatedUserQuizz) => {
              res.status(201).json(updatedUserQuizz);
            })
            .catch((error) => {
              res.json(error);
            });
        } else {
          console.log("quizz already found and request body as", req.body);
          userQuizz
            .create({
              takenBy: user._id,
              quizz: req.body.quizzId,
              reference: [reference],
            })
            .then((userQuizz) => {
              res.status(201).json(userQuizz);
            })
            .catch((error) => {
              res.json(error);
            });
        }
      });
  });
};

const fetchYourQuizzs = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    userQuizz
      .find({ takenBy: user._id })
      .then((userQuizzDocuments) => {
        const takenQuizzsPromise = userQuizzDocuments.map(
          (userQuizzDocument) => {
            return quizz.findById(userQuizzDocument.quizz);
          }
        );

        Promise.all(takenQuizzsPromise)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => {
            res.status(404).json(error);
          });
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  });
};

const fetchYourQuizz = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    userQuizz
      .findOne({ quizz: req.body.quizzId, takenBy: user._id })
      .then((userQuizzDocument) => {        
        const questionsPromises = (userQuizzDocument.reference).map(
          (referenceOb) => {
            return question.findById(referenceOb.question);
          }
        );
        Promise.all(questionsPromises).then((questions) => {          
          const takenQuestions = userQuizzDocument.reference.map((referenceOb) => {
            const question = questions.find((q) => q._id.toString() === referenceOb.question.toString());
            return {
              ...question.toObject(),
              selectedIndex: referenceOb.selectedIndex,
            };
          });
          
          res.status(201).json(takenQuestions)

        });
      });
  });
};













const createMcq = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    question
      .create({
        user: user._id,
        questionBody: req.body.questionBody,
        choices: req.body.option,
        AnswerIndex: req.body.AnswerIndex,
        quizzTitle: req.body.quizzId,
      })
      .then(() => {
        res.redirect("/home");
      });
  });
};

const quizzHome = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    quizz.find({}).then((quizzs) => {
      const promiseArray = [];
      const quizzTitleIds = [];
      // Confirm whether user has given that quizz or not

      userQuizz.find({ takenBy: user }).then((userQuizzs) => {
        userQuizzs.forEach((userQuizz) => {
          const promise = new Promise((res, rej) => {
            quizzTitleIds.push(userQuizz.quizzTitle);
            res();
          });
          promiseArray.push(promise);
        });

        Promise.all(promiseArray).then(() => {
          // console.log('quizzs   => ',quizzs);
          // console.log('quizzTitleIds   => ',quizzTitleIds);
          const updatedQuizz = [];
          quizzs.forEach((quizz) => {
            let exist = 0;
            quizzTitleIds.forEach((quizzTitleId) => {
              if (quizz._id.equals(quizzTitleId)) {
                exist++;
              }
            });
            if (exist === 0) {
              updatedQuizz.push(quizz);
            }
          });
          // console.log('updatedQuizzs   => ',updatedQuizz);
          res.render("quizzHome", { user: user, quizzs: updatedQuizz });
        });
      });
    });
  });
};

const yourQuizz = (req, res) => {
  userModel
    .findOne({ email: req.credentials.email })
    .then((user) => {
      let array = [];
      userQuizz
        .find({ user: user._id })
        .then((quizzs) => {
          const promises = quizzs.map((quizz) => {
            return quizz
              .findOne({ _id: quizz.quizzTitle })
              .then((quizzTitleInstance) => {
                array.push(quizzTitleInstance);
              });
          });
          return Promise.all(promises).then(() => {
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
//     quizz.findOne({_id:req.query.id})
//         .then((quizzTitle)=>{
//              userQuizz.findOne({quizzTitle:req.query.id})
//                 .then((userQuizzInstance)=>{
//                     // res.send(userQuizzInstance.questions);
//                     const promisesArray = (userQuizzInstance.questions).map((question)=>{
//                         return question.findOne({_id:question.referencedObject})
//                             .then((questionInstance)=>{
//                                 let object = {questionInstance:question.selectedIndex}
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

const yourQuizzInfo = (req, res) => {
  userModel.findOne({ email: req.credentials.email }).then((user) => {
    const promises = [];
    const arr = [];
    userQuizz
      .findOne({ quizzTitle: req.query.id, user: user })
      .then((userQuizz) => {
        userQuizz.questions.forEach((ob) => {
          const promise = question
            .findById(ob.referencedObject)
            .then((questionInstance) => {
              arr.push({
                referencedInstance: questionInstance,
                selectedIndex: ob.selectedIndex,
              });
            });
          promises.push(promise);
        });
        Promise.all(promises).then(() => {
          quizz.findById(req.query.id).then((quizzTitle) => {
            // res.send(arr)
            res.render("yourQuizz", { quizzTitle: quizzTitle, arr: arr });
          });
        });
      });
  });
};

module.exports = {
  createQuizz,
  home,
  fetchQuestions,
  submitQuizz,
  fetchYourQuizzs,
  fetchYourQuizz,


  createMcq,
  quizzHome,
  takeQuizz,
  yourQuizz,
  yourQuizzInfo,
};
