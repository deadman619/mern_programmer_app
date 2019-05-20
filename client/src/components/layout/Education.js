import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteEducation(id);
	}

	render() {
		const Education = this.props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>{edu.field}</td>
				<td>{edu.from} - {edu.current ? 'Now' : edu.to}</td>
				<td><button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn-danger">Delete</button></td>
			</tr>
		));
		return (
			<div>
				<h4 className="mb-4">Education Entries</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Field</th>
							<th>Attendance Period</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{Education}
					</tbody>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education);