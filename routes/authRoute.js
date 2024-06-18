const router = require('express').Router();
const {signUp,login,logout} = require('../controllers/authController')
const {createJwt,verifyJwt} = require('../middlewares/jwtMiddleware')


router.route('/signUp')
    .post(createJwt,signUp)

router.route('/login')
    .post(createJwt,login)
    
router.route('/logout')
 
module.exports = router;
