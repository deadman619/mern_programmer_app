import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const ProfileActions = () => {
	return (
		<div className="btn-group mb-4" role="group">
			<Link to="/edit-profile" className="btn btn-light">
				<FontAwesomeIcon icon={faUserCircle} className="mr-2" />
				Edit Profile
			</Link>
			<Link to="/add-experience" className="btn btn-light">
				<FontAwesomeIcon icon={faBriefcase} className="mr-2" />
				Add Experience
			</Link>
			<Link to="/add-education" className="btn btn-light">
				<FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
				Add Education
			</Link>
		</div>
	)
}

export default ProfileActions;