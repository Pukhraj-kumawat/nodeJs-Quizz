const router = require('express').Router();
const {register} = require('../controllers/register')
const {signUp,login} = require('../middlewares/authMiddleware')

router.route('/register')
    .get(register);

router.route('/signUp')
    .post(signUp)

router.route('/login')
    .post(login)

module.exports = router;