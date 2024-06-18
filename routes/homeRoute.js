const router = require('express').Router();
const {home,submitQuizz,createQuizz,fetchQuestions,fetchYourQuizzs,fetchYourQuizz,createMcq,quizzHome,takeQuizz,yourQuizz,yourQuizzInfo} = require('../controllers/homeController')
const {verifyJwt} = require('../middlewares/jwtMiddleware')



router.route('/home')
    .get(verifyJwt,home)

router.route('/createQuizz')
    .post(verifyJwt,createQuizz)

router.route('/fetchQuestions')
    .post(verifyJwt,fetchQuestions)
    
router.route('/takeQuizz')
    .post(verifyJwt,takeQuizz)

router.route('/submitQuizz')    
    .post(verifyJwt,submitQuizz)

router.route('/fetchYourQuizzs')    
    .get(verifyJwt,fetchYourQuizzs)

router.route('/fetchYourQuizz')    
    .post(verifyJwt,fetchYourQuizz)




router.route('/createMcq')
    .post(verifyJwt,createMcq)

router.route('/')
    .get(verifyJwt,quizzHome)



router.route('/yourQuizz')
    .get(verifyJwt,yourQuizz)

router.route('/yourQuizzInfo')
    .get(verifyJwt,yourQuizzInfo)

module.exports = router;





