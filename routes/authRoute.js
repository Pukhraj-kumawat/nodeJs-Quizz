const router = require('express').Router();
const {register} = require('../controllers/register')
const {signUp,login} = require('../controllers/authController')
const {createJwt,verifyJwt} = require('../middlewares/jwtMiddleware')

router.route('/register')
    .get(register);

router.route('/signUp')
    .post(createJwt,signUp)

router.route('/login')
    .post(createJwt,login)

module.exports = router;