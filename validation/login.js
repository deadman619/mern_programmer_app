const Validator = require('validator');

// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// Field content validation
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	// Empty field validation
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}