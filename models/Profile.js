const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Profile schema for mongoDB
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	username: {
		type: String,
		required: true,
		max: 15
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [String],
		required: true
	},
	summary: {
		type: String
	},
	githubUsername: {
		type: String
	},
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			from: {
				type: String,
				required: true
			},
			to: {
				type: String
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			},
		}
	],
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String,
				required: true
			},
			field: {
				type: String,
				required: true
			},
			from: {
				type: String,
				required: true
			},
			to: {
				type: String
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	social: {
		steam: {
			type: String
		},
		facebook: {
			type: String
		},
		lastFm: {
			type: String
		},
		twitter: {
			type: String
		},
		linkedIn: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);