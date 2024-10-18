const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// todo: Register
const register = async (req, res) => {
	const { username, email, password } = req.body;
	let user;
	try {
		const isExistingUser = await User.findOne({ email });
		if (isExistingUser) {
			return res.json({
				success: false,
				message: 'User exists with the same email.',
			});
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		user = new User({
			username,
			email,
			password: hashedPassword,
		});
		await user.save();
		res.status(201).json({
			success: true,
			message: 'User registered successfully',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Some error occurred!',
		});
	}
};

// todo: Login
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const userExists = await User.findOne({ email });
		if (!userExists) {
			return res.json({
				success: false,
				message: 'Failed to find user with this email.',
			});
		}
		const doPasswordMatch = await bcrypt.compare(password, userExists.password);
		if (!doPasswordMatch) {
			return res.json({
				success: false,
				message: 'Incorrect Password! Please try again.',
			});
		}

		const token = jwt.sign(
			{
				id: userExists.id,
				role: userExists.role,
				email: userExists.email,
				name: userExists.username,
			},
			'super_secret_key',
			{ expiresIn: '1h' }
		);

		// Render doesn't allow setting cookies.
		// res.cookie('token', token, {
		// 	httpOnly: true,
		// 	secure: false,
		// });

		return res.json({
			success: true,
			message: 'User logged in successfully!',
			token, // To set the token in sessionStorage
			user: {
				email: userExists.email,
				role: userExists.role,
				id: userExists.id,
				name: userExists.username,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Some error occurred!',
		});
	}
};

// todo: Logout
const logout = (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'User logged out successfully.',
	});
};

// todo: Authentication Middleware
const authMiddleware = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized User!',
		});
	}
	try {
		const decodedToken = jwt.verify(token, 'super_secret_key');
		req.user = decodedToken;
		next();
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized User!',
		});
	}
};

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.authMiddleware = authMiddleware;
