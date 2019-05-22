import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import ProfileHeader from '../profile/ProfileHeader';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileCreds from '../profile/ProfileCreds';
import ProfileGithub from '../profile/ProfileGithub';
import { getProfileByUsername } from '../../actions/profileActions';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.username) {
			this.props.getProfileByUsername(this.props.match.params.username)
		}
	}

	render() {
		const {profile, loading} = this.props.profile;
		let profileContent;
		if (profile === null || loading) {
			profileContent = <Spinner />
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds education={profile.education} experience={profile.experience} />
					{profile.githubUsername ? (<ProfileGithub username={profile.githubUsername} />) : null}
				</div>
			)
		}
		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{profileContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfileByUsername: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, {getProfileByUsername})(Profile);