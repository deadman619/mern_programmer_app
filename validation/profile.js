const Validator = require('validator');
const usernameValidationMinimum = 2;
const usernameValidationMaximum = 15;
// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.username = !isEmpty(data.username) ? data.username : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';

	// Field content validation
	if(!Validator.isLength(data.username, {min: usernameValidationMinimum, max: usernameValidationMaximum})) {
		errors.username = `Username must be between ${usernameValidationMinimum} and ${usernameValidationMaximum} characters`;
	}

	// Empty field validation
	if(Validator.isEmpty(data.username)) {
		errors.username = 'Username field is required';
	}
	if(Validator.isEmpty(data.status)) {
		errors.status = 'Status field is required';
	}
	if(Validator.isEmpty(data.skills)) {
		errors.skills = 'Status field is required';
	}

	// Website and social media URL validation
	if(!isEmpty(data.website)) {
		if(!Validator.isURL(data.website)) {
			errors.website = 'URL is invalid';
		}
	}
	if(!isEmpty(data.steam)) {
		if(!Validator.isURL(data.steam)) {
			errors.steam = 'URL is invalid';
		}
	}
	if(!isEmpty(data.github)) {
		if(!Validator.isURL(data.github)) {
			errors.github = 'URL is invalid';
		}
	}
	if(!isEmpty(data.facebook)) {
		if(!Validator.isURL(data.facebook)) {
			errors.facebook = 'URL is invalid';
		}
	}
	if(!isEmpty(data.lastFm)) {
		if(!Validator.isURL(data.lastFm)) {
			errors.lastFm = 'URL is invalid';
		}
	}
	if(!isEmpty(data.twitter)) {
		if(!Validator.isURL(data.twitter)) {
			errors.twitter = 'URL is invalid';
		}
	}
	if(!isEmpty(data.linkedIn)) {
		if(!Validator.isURL(data.linkedIn)) {
			errors.linkedIn = 'URL is invalid';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}