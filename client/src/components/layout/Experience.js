import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id);
	}

	render() {
		const experience = this.props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.title}</td>
				<td>{exp.company}</td>
				<td>{exp.from} - {exp.current ? 'Now' : exp.to}</td>
				<td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn-danger">Delete</button></td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Experience Entries</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Company</th>
							<th>Employment Period</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{experience}
					</tbody>
				</table>
			</div>
		);
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);