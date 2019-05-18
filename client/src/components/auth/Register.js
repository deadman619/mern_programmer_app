import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

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
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.errors !== prevState.errors) {
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
								<div className="form-group">
									<input 
									type="text" 
									className={classnames("form-control form-control-lg", {
										'is-invalid': errors.name
									})}
									placeholder="Name" 
									name="name"
									value={this.state.name}
									onChange={this.onChange}
									/>
									{errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
								</div>
								<div className="form-group">
									<input 
									type="email" 
									className={classnames("form-control form-control-lg", {
										'is-invalid': errors.email
									})} 
									placeholder="Email"
									name="email" 
									value={this.state.email}
									onChange={this.onChange}
									/>
									{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
								</div>
								<div className="form-group">
									<input 
									type="text" 
									className="form-control form-control-lg" 
									placeholder="Profile Icon URL" 
									name="profileIcon" 
									value={this.state.profileIcon}
									onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<input 
									type="password" 
									className={classnames("form-control form-control-lg", {
										'is-invalid': errors.password
									})}
									placeholder="Password" 
									name="password" 
									value={this.state.password}
									onChange={this.onChange}
									/>
									{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
								</div>
								<div className="form-group">
									<input 
									type="password" 
									className={classnames("form-control form-control-lg", {
										'is-invalid': errors.confirmPassword
									})}
									placeholder="Confirm Password" 
									name="confirmPassword" 
									value={this.state.confirmPassword}
									onChange={this.onChange}
									/>
									{errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
								</div>
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