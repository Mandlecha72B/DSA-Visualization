const { signup, login, forgotPassword, uploadProfilePictureController } = require('../controllers/authController');
const { signupValidation, loginValidation, forgotPasswordValidation} = require('../middlewares/authValidation');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = require('express').Router();
router.post('/signUp', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password',forgotPasswordValidation, forgotPassword);
router.post('/upload-profile-picture', ensureAuthenticated, upload.single("profilePicture"), uploadProfilePictureController);
router.get('/verify-token', ensureAuthenticated,(req,res)=>{
    res.json({ valid: true, user: req.user });
})

module.exports = router;

//router.get("/google", googleAuth);