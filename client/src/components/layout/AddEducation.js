import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			field: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.errors) {
			return {errors: nextProps.errors}
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			field: this.state.field,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(eduData, this.props.history);
	}

	onCheck(e) {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">Back</Link>
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">Add any school or other learning institution you have attended</p>
							<small className="d-block pb-3">* = required</small>
							<form onSubmit={this.onSubmit}>
								<TextField
								placeholder="* School"
								name="school"
								value={this.state.school}
								onChange={this.onChange}
								error={errors.school}
								/>
								<TextField
								placeholder="* Degree"
								name="degree"
								value={this.state.degree}
								onChange={this.onChange}
								error={errors.degree}
								/>
								<TextField
								placeholder="* Field"
								name="field"
								value={this.state.field}
								onChange={this.onChange}
								error={errors.field}
								/>
								<TextField
								placeholder="* From"
								name="from"
								value={this.state.from}
								onChange={this.onChange}
								error={errors.from}
								/>
								<TextField
								placeholder="To"
								name="to"
								value={this.state.to}
								onChange={this.onChange}
								error={errors.to}
								disabled={this.state.disabled? 'disabled' : ''}
								info="Use whatever date format you prefer (i.e 1999-01-01 or January 1st, 1999)"
								/>
								<div className="form-check mb-4">
									<input 
									type="checkbox"
									className="form-check-input"
									name="current"
									value={this.state.current}
									checked={this.state.current}
									onChange={this.onCheck}
									id="current"
									/>
									<label htmlFor="current" className="form-check-label">Current School</label>
								</div>
								<TextAreaField
								placeholder="Education Description"
								name="description"
								value={this.state.description}
								onChange={this.onChange}
								error={errors.description}
								info="Type in anything else you might want to add about your education"
								/>
								<input type="submit" value="Submit" className="btn btn-danger btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));