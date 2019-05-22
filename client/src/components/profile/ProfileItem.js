import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class ProfileItem extends Component {
	render() {
		const {profile} = this.props;
		return (
			<div className="card card-body bg-light mb-3">
				<div className="row">
					<div className="col-lg-4">
						<img src={profile.user.profileIcon} alt="profile icon" className="rounded" />
					</div>
					<div className="col-lg-4 col-md-8 col-6">
						<h3>{profile.user.name}</h3>
						<p>{profile.status}</p>
						<Link to={`/profile/${profile.username}`} className="btn btn-dark">View Profile</Link>
					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Skills</h4>
						<ul className="list-group">
							{profile.skills.slice(0, 3).map(skill => (
								<li key={skill} className="list-group-item">
									<FontAwesomeIcon icon={faCheck} className="pr-1" />
									{skill}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired
}

export default ProfileItem;
