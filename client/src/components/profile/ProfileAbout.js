import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class ProfileAbout extends Component {
	render() {
		const {profile} = this.props;
		let summary;
		if (profile.summary) {
			summary = 
				<div>
					<h3 className="text-center text-dark">Summary</h3>
					<p className="lead">{isEmpty(profile.summary) ? null : (<span>{profile.summary}</span>)}</p>
					<hr />
				</div>
		}
		const skills = profile.skills.map(skill => (
			<div key={skill} className="p-3">
				<FontAwesomeIcon icon={faCheck} />
				{skill}
			</div>
			)
		);
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						{summary}
						<h3 className="text-center text-dark">Skills</h3>
						<div className="row">
							<div className="d-flex frex-wrap justify-content-center align-items-center">
								{skills}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
}

export default ProfileAbout;
