const Validator = require('validator');

// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.title = !isEmpty(data.title) ? data.title : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	// Empty field validation
	if(Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required';
	}
	if(Validator.isEmpty(data.company)) {
		errors.company = 'Company field is required';
	}
	if(Validator.isEmpty(data.from)) {
		errors.from = 'From field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}