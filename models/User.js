const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema for mongoDB
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profileIcon: {
		type: String,
		required: true
	},
	registrationDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('users', UserSchema);