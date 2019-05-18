const Validator = require('validator');
const maxPostLength = 500;
// Custom isEmpty method because Validator.isEmpty only works on strings
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
	let errors = {};
	
	// Convert undefined/null/etc to string with custom method
	data.text = !isEmpty(data.text) ? data.text : '';

	// Field content validation
	if(!Validator.isLength(data.text, {min: 1, max: maxPostLength})) {
		errors.text = `Post length must be less or equal to ${maxPostLength} characters`;
	}

	// Empty field validation
	if(Validator.isEmpty(data.text)) {
		errors.text = 'Text field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}