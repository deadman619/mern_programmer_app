const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route 	GET api/users/test
// @desc 	Tests users route
// @access 	Public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

// @route 	GET api/users/register
// @desc 	Register user
// @access 	Public
router.post('/register', (req, res) => {
	const {errors, isValid} = validateRegisterInput(req.body);

	// Validate fields
	if(!isValid) {
		return res.status(400).json(errors);
	}
	
	// Proceed with registration
	User.findOne({email: req.body.email})
	.then(user => {
		if(user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		}
		let profileIcon = req.body.profileIcon;
		if(!profileIcon) {
			profileIcon = 'https://loremflickr.com/320/240';
		}
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			profileIcon,
			password: req.body.password
		});

		// Password encryption + saving new user
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(newUser.password, salt, (error, hash) => {
				if(error) {
					throw error;
				}
				newUser.password = hash;
				newUser.save()
					.then(user => res.json(user))
					.catch(error => console.log(error));
			});
		});
	});
});

// @route 	GET api/users/login
// @desc 	Login user, return JSON web token
// @access 	Public
router.post('/login', (req, res) => {
	const {errors, isValid} = validateLoginInput(req.body);

	// Validate fields
	if(!isValid) {
		return res.status(400).json(errors);
	}

	// Proceed with login
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({email}).then(user => {
		if(!user) {
			errors.email = 'Login data incorrect';
			return res.status(400).json(errors);
		}
		bcrypt.compare(password, user.password).then(isMatch => {
			if(isMatch) {
				// JWT payload
				const payload = {id: user.id, name: user.name, profileIcon: user.profileIcon}

				// Sign token
				jwt.sign(payload, 
					keys.secretOrKey, 
					{expiresIn: 3600}, 
					(error, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.email = 'Login data incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

// @route 	GET api/users/current
// @desc 	Return current user
// @access 	Private
// Authenticate with jwt. Not using session, so session = false
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;