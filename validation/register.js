const Validator = require('validator');
const nameValidationMinimum = 2;
const nameValidationMaximum = 30;
const passwordValidationMinimum = 6;
const passwordValidationMaximum = 30;

// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

	// Field content validation
	if(!Validator.isLength(data.name, {min: nameValidationMinimum, max: nameValidationMaximum})) {
		errors.name = `Name must be between ${nameValidationMinimum} and ${nameValidationMaximum} characters`;
	}
	if(!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if(!Validator.isLength(data.password, {min: passwordValidationMinimum, max: passwordValidationMaximum}))
		errors.password = `Password must be at least ${passwordValidationMinimum} characters long`;
	if(!Validator.equals(data.password, data.confirmPassword)) {
		errors.password = 'Passwords must match';
	}
	
	// Empty field validation
	if(Validator.isEmpty(data.name)) {
		errors.name = 'Name field is required';
	}
	if(Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}
	if(Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	if(Validator.isEmpty(data.confirmPassword)) {
		errors.confirmPassword = 'Password confirmation field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}