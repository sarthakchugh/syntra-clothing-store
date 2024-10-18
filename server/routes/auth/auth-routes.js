const express = require('express');
const router = express.Router();

const { register, login, logout, authMiddleware } = require('../../controllers/auth/auth-controller');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); 
router.get('/authenticate', authMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		message: 'User authenticated!',
		user,
	});
});

module.exports = router;
