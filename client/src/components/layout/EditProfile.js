import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectList from '../common/SelectList';
import { faSteamSquare, faFacebookSquare, faLastfmSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			username: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			summary: '',
			githubUsername: '',
			steam: '',
			facebook: '',
			lastFm: '',
			twitter: '',
			linkedIn: '',
			loadedProfile: false,
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.profile.profile && prevState.loadedProfile === false) {
			const profile = nextProps.profile.profile;
			profile.username = !isEmpty(profile.username) ? profile.username: '';
			profile.website = !isEmpty(profile.website) ? profile.website: '';
			profile.location = !isEmpty(profile.location) ? profile.location: '';
			profile.summary = !isEmpty(profile.summary) ? profile.summary: '';
			profile.githubUsername = !isEmpty(profile.githubUsername) ? profile.githubUsername: '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.steam = !isEmpty(profile.social.steam) ? profile.social.steam : '';
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
			profile.lastFm = !isEmpty(profile.social.lastFm) ? profile.social.lastFm : '';
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
			profile.linkedIn = !isEmpty(profile.social.linkedIn) ? profile.social.linkedIn : '';

			return {
				username: profile.username,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: profile.skills.join(','),
				summary: profile.summary,
				githubUsername: profile.githubUsername,
				steam: profile.steam,
				facebook: profile.facebook,
				lastFm: profile.lastFm,
				twitter: profile.twitter,
				linkedIn: profile.linkedIn,
				loadedProfile: true
			}
		}
		if(nextProps.errors) {
			return {errors: nextProps.errors}
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const profileData = {
			username: this.state.username,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			summary: this.state.summary,
			githubUsername: this.state.githubUsername,
			steam: this.state.steam,
			facebook: this.state.facebook,
			lastFm: this.state.lastFm,
			twitter: this.state.twitter,
			linkedIn: this.state.linkedIn
		}
		this.props.createProfile(profileData, this.props.history);
	}

	render() {
		const {errors, displaySocialInputs } = this.state;
		let socialInputs;
		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup 
					placeholder="Steam URL"
					name="steam"
					icon={faSteamSquare}
					value={this.state.steam}
					onChange={this.onChange}
					error={errors.steam}
					/>
					<InputGroup 
					placeholder="Facebook URL"
					name="facebook"
					icon={faFacebookSquare}
					value={this.state.facebook}
					onChange={this.onChange}
					error={errors.facebook}
					/>
					<InputGroup 
					placeholder="LastFM URL"
					name="lastFm"
					icon={faLastfmSquare}
					value={this.state.lastFm}
					onChange={this.onChange}
					error={errors.lastFm}
					/>
					<InputGroup 
					placeholder="Twitter URL"
					name="twitter"
					icon={faTwitterSquare}
					value={this.state.twitter}
					onChange={this.onChange}
					error={errors.twitter}
					/>
					<InputGroup 
					placeholder="LinkedIn URL"
					name="linkedIn"
					icon={faLinkedin}
					value={this.state.linkedIn}
					onChange={this.onChange}
					error={errors.linkedIn}
					/>
				</div>
			)
		}
		const options = [
			{
				label: '* Select Professional Status',
				value: 0
			},
			{
				label: 'Student',
				value: 'Student'
			},
			{
				label: 'Intern',
				value: 'Intern'
			},
			{
				label: 'Junior Developer',
				value: 'Junior Developer'
			},
			{
				label: 'Developer',
				value: 'Developer'
			},
			{
				label: 'Senior Developer',
				value: 'Senior Developer'
			},
			{
				label: 'Freelancer',
				value: 'Freelancer'
			},
			{
				label: 'Instructor',
				value: 'Instructor'
			},
			{
				label: 'Other',
				value: 'Other'
			},
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">Back</Link>
							<h1 className="display-4 text-center">Edit Profile</h1>
							<small className="d-block pb-3">* = required</small>
							<form onSubmit={this.onSubmit}>
								<TextField 
								placeholder="* Username"
								name="username"
								value={this.state.username}
								onChange={this.onChange}
								error={errors.username}
								info="A unique username that is going to be used for your profile URL."
								/>
								<SelectList 
								placeholder="Status"
								name="status"
								value={this.state.status}
								onChange={this.onChange}
								options={options}
								error={errors.status}
								info="Select your current occupation status."
								/>
								<TextField 
								placeholder="Website"
								name="website"
								value={this.state.website}
								onChange={this.onChange}
								error={errors.website}
								info="Your own website, or if you prefer, a website of the company you work for."
								/>
								<TextField 
								placeholder="Location"
								name="location"
								value={this.state.location}
								onChange={this.onChange}
								error={errors.location}
								info="The location you are currently residing in."
								/>
								<TextField 
								placeholder="* Programming Skills"
								name="skills"
								value={this.state.skills}
								onChange={this.onChange}
								error={errors.skills}
								info="Please use comma seperated values (i.e. HTML,CSS,JS)."
								/>
								<TextField 
								placeholder="GitHub Username"
								name="githubUsername"
								value={this.state.githubUsername}
								onChange={this.onChange}
								error={errors.githubUsername}
								info="If you want your latest repositories displayed on your profile, include your GitHub username here."
								/>
								<TextAreaField 
								placeholder="Profile Summary"
								name="summary"
								value={this.state.summary}
								onChange={this.onChange}
								error={errors.summary}
								info="Anything else you might want to add goes here."
								/>
								<div className="mb-3">
									<button type="button" onClick={() => {
										this.setState(prevState => ({displaySocialInputs: !prevState.displaySocialInputs}))
									}}
									className="btn btn-light">
										Add Social Media Links
									</button>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" className="btn btn-danger btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));
