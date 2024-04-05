const router = require('express').Router();
const {register} = require('../controllers/register')
const {signUp,login,logout} = require('../controllers/authController')
const {createJwt,verifyJwt} = require('../middlewares/jwtMiddleware')

router.route('/register')
    .get(register);

router.route('/signUp')
    .post(createJwt,signUp)

router.route('/login')
    .post(createJwt,login)
    
router.route('/logout')
    .get(logout);

module.exports = router;