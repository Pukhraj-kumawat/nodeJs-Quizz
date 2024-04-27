const router = require('express').Router();
const {home,submitQuizz,createQuizz,createMcq,quizzHome,takeQuizz,yourQuizz,yourQuizzInfo} = require('../controllers/homeController')
const {verifyJwt} = require('../middlewares/jwtMiddleware')


router.route('/mcq')
    .post(createQuizz)

router.route('/home')
    .get(verifyJwt,home)

router.route('/createQuizz')
    .post(verifyJwt,createQuizz)

router.route('/submitQuizz')    
    .post(verifyJwt,submitQuizz)

router.route('/createMcq')
    .post(verifyJwt,createMcq)

router.route('/')
    .get(verifyJwt,quizzHome)

router.route('/takeQuizz')
    .post(verifyJwt,takeQuizz)

router.route('/yourQuizz')
    .get(verifyJwt,yourQuizz)

router.route('/yourQuizzInfo')
    .get(verifyJwt,yourQuizzInfo)

module.exports = router;





