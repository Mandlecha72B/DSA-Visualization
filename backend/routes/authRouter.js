const { signup, login,forgotPassword } = require('../controllers/authController');
const { signupValidation, loginValidation, forgotPasswordValidation} = require('../middlewares/authValidation');


const router = require('express').Router();
router.post('/signUp', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password',forgotPasswordValidation, forgotPassword);

module.exports = router;

//router.get("/google", googleAuth);