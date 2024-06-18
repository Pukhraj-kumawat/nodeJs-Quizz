const router = require('express').Router();
const {home,submitQuizz,createQuizz,fetchQuestions,fetchYourQuizzs,fetchYourQuizz,takeQuizz,} = require('../controllers/homeController')
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



module.exports = router;





