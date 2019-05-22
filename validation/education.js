const Validator = require('validator');

// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.field = !isEmpty(data.field) ? data.field : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	// Empty field validation
	if (Validator.isEmpty(data.school)) {
		errors.school = 'School field is required';
	}
	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'Degree field is required';
	}
	if (Validator.isEmpty(data.field)) {
		errors.field = 'Study field is required';
	}
	if (Validator.isEmpty(data.from)) {
		errors.from = 'From field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}