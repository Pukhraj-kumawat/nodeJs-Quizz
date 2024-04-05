const router = require('express').Router();
const {home,submitQuizz,createQuizz} = require('../controllers/homeController')
const {verifyJwt} = require('../middlewares/jwtMiddleware')


router.route('/mcq')
    .post(createQuizz)

router.route('/home')
    .get(verifyJwt,home)

router.route('/createQuizz')
    .post(verifyJwt,createQuizz)

router.route('/submitQuizz')    
    .get(verifyJwt,submitQuizz)

module.exports = router;





