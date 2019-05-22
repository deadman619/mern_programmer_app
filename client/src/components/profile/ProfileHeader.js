import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteamSquare, faFacebookSquare, faLastfmSquare, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

class ProfileHeader extends Component {
	render() {
		const {profile} = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-danger text-white mb-3">
						<div className="row">
							<div className="col-4 col-md-3 m-auto">
								<img src={profile.user.profileIcon} alt="profile icon"/>
							</div>
						</div>
						<div className="text-center">
							<h1 className="display-4 text-center">{profile.user.name}</h1>
							<p className="lead text-center">{profile.status}</p>
							<p className="lead text-center">{isEmpty(profile.location) ? null : profile.location}</p>
							<p>
								{isEmpty(profile.website) ? null: (
									<a href={profile.website} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faExternalLinkSquareAlt} size="2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.steam) ? null: (
									<a href={profile.social.steam} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faSteamSquare} size="2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.facebook) ? null: (
									<a href={profile.social.facebook} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faFacebookSquare} size="2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.lastFm) ? null: (
									<a href={profile.social.lastFm} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faLastfmSquare} size="2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.twitter) ? null: (
									<a href={profile.social.twitter} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faTwitterSquare} size="2x" />
									</a>
								)}
								{isEmpty(profile.social && profile.social.linkedIn) ? null: (
									<a href={profile.social.linkedIn} className="text-white p-2" target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faLinkedin} size="2x" />
									</a>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileHeader;
