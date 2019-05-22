import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextField from '../common/TextField';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			profileIcon: '',
			password: '',
			confirmPassword: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.errors !== prevState.errors) {
			return {errors: nextProps.errors};
		}
		return null;
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			profileIcon: this.state.profileIcon,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		}
		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your Programmer App account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextField
								placeholder="Name"
								name="name"
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
								/>
								<TextField
								placeholder="Email"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
								/>
								<TextField
								placeholder="Profile Icon URL"
								name="profileIcon"
								value={this.state.profileIcon}
								onChange={this.onChange}
								/>
								<TextField
								placeholder="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
								/>
								<TextField
								placeholder="Confirm Password"
								name="confirmPassword"
								type="password"
								value={this.state.confirmPassword}
								onChange={this.onChange}
								error={errors.confirmPassword}
								/>
								<input type="submit" className="btn btn-dark btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));