const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load input validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route 	GET api/profile
// @desc 	Get current logged in user
// @access 	Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const errors = {};
	Profile.findOne({user: req.user.id})
	.populate('user', ['name', 'profileIcon'])
	.then(profile => {
		if (!profile) {
			errors.noProfile = 'User profile does not exist';
			return res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(error => res.status(404).json(error));
});

// @route 	GET api/profile/all
// @desc 	All profiles
// @access 	Public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
	.populate('user', ['name', 'profileIcon'])
	.then(profiles => {
		if (!profiles) {
			errors.noProfile = 'There are no profiles';
			return res.status(404).json(errors);
		}
		res.json(profiles);
	})
	.catch(error => res.status(404).json({profile: 'There are no profiles'}));
});

// @route 	GET api/profile/user/:username
// @desc 	Profile by username
// @access 	Public
router.get('/user/:username', (req, res) => {
	const errors = {};
	Profile.findOne({username: req.params.username})
	.populate('user', ['name', 'profileIcon'])
	.then(profile => {
		if (!profile) {
			errors.noProfile = 'User profile does not exist';
			res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(error => res.status(404).json({profile: 'User profile does not exist'}));
});

// @route 	GET api/profile/id/:id
// @desc 	Profile by id
// @access 	Public
router.get('/id/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({user: req.params.user_id})
	.populate('user', ['name', 'profileIcon'])
	.then(profile => {
		if (!profile) {
			errors.noProfile = 'User profile does not exist';
			res.status(404).json(errors);
		}
		res.json(profile);
	})
	.catch(error => res.status(404).json({profile: 'User profile does not exist'}));
});

// @route 	POST api/profile
// @desc 	Create/update user profile
// @access 	Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateProfileInput(req.body);

	// Validate fields
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Proceed with profile creation/update
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.username) {
		profileFields.username = req.body.username;
	}
	if (req.body.website) {
		profileFields.website = req.body.website;
	}
	if (req.body.location) {
		profileFields.location = req.body.location;
	}
	if (req.body.status) {
		profileFields.status = req.body.status;
	}
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
		profileFields.skills = profileFields.skills.map(skill => skill.trim());
	}
	if (req.body.summary) {
		profileFields.summary = req.body.summary;
	}
	if (req.body.githubUsername) {
		profileFields.githubUsername = req.body.githubUsername;
	}
	
	// Social media entries
	profileFields.social = {};
	if (req.body.steam) {
		profileFields.social.steam = req.body.steam;
	}
	if (req.body.facebook) {
		profileFields.social.facebook = req.body.facebook;
	}
	if (req.body.lastFm) {
		profileFields.social.lastFm = req.body.lastFm;
	}
	if (req.body.twitter) {
		profileFields.social.twitter = req.body.twitter;
	}
	if (req.body.linkedIn) {
		profileFields.social.linkedIn = req.body.linkedIn;
	}

	Profile.findOne({user: req.user.id})
	.then(profile => {
		if (profile) {
			// Update profile
			Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
			.then(profile => res.json(profile));
		} else {
			// Create profile
			Profile.findOne({username: profileFields.username})
			.then(profile => {
				if (profile) {
					errors.username = 'Username already exists';
					res.status(400).json(errors);
				}
			// Save profile
			new Profile(profileFields).save().then(profile => res.json(profile));
			});
		}
	});
});

// @route 	POST api/profile/experience
// @desc 	Add experience to profile
// @access 	Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateExperienceInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Profile.findOne({user: req.user.id})
	.then(profile => {
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		}
		profile.experience.unshift(newExp);
		profile.save().then(profile => res.json(profile));
	});
});

// @route 	POST api/profile/education
// @desc 	Add education to profile
// @access 	Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
	const {errors, isValid} = validateEducationInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Profile.findOne({user: req.user.id})
	.then(profile => {
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			field: req.body.field,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		}
		profile.education.unshift(newEdu);
		profile.save().then(profile => res.json(profile));
	});
});

// @route 	DELETE api/profile/experience/:exp_id
// @desc 	Delete experience from profile
// @access 	Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
	.then(profile => {
		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
		profile.experience.splice(removeIndex, 1);
		profile.save().then(profile => res.json(profile));
	})
	.catch(error => res.status(404).json(error));
});

// @route 	DELETE api/profile/education/:edu_id
// @desc 	Delete education from profile
// @access 	Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOne({user: req.user.id})
	.then(profile => {
		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
		profile.education.splice(removeIndex, 1);
		profile.save().then(profile => res.json(profile));
	})
	.catch(error => res.status(404).json(error));
});

// @route 	DELETE api/profile/
// @desc 	Delete user and profile
// @access 	Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	Profile.findOneAndRemove({user: req.user.id})
	.then(() => {
		User.findOneAndRemove({_id: req.user.id})
		.then(() => res.json({success: true}));
	});
});

module.exports = router;