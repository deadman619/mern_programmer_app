import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			company: '',
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
		if (nextProps.errors) {
			return {errors: nextProps.errors}
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const expData = {
			title: this.state.title,
			company: this.state.company,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addExperience(expData, this.props.history);
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
			<div className="add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">Back</Link>
							<h1 className="display-4 text-center">Add Experience</h1>
							<p className="lead text-center">Add any current or past job experience</p>
							<small className="d-block pb-3">* = required</small>
							<form onSubmit={this.onSubmit}>
								<TextField
								placeholder="* Title"
								name="title"
								value={this.state.title}
								onChange={this.onChange}
								error={errors.title}
								/>
								<TextField
								placeholder="* Company"
								name="company"
								value={this.state.company}
								onChange={this.onChange}
								error={errors.company}
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
									<label htmlFor="current" className="form-check-label">Current Job</label>
								</div>
								<TextAreaField
								placeholder="Job Description"
								name="description"
								value={this.state.description}
								onChange={this.onChange}
								error={errors.description}
								info="Elaborate on the job if you wish to do so"
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

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));