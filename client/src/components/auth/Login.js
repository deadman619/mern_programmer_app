import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextField from '../common/TextField';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
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
		if (nextProps.auth.isAuthenticated) {
			return {auth: true};
		}
		if (nextProps.errors !== prevState.errors) {
			return {errors: nextProps.errors};
		}
		return null;
	}

	componentDidUpdate(prevState) {
		if (prevState.auth !== this.props.auth && this.state.auth === true) {
			this.props.history.push('/dashboard');
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		this.props.loginUser(userData);
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Log in to your Programmer App account</p>
							<form noValidate onSubmit={this.onSubmit}>
								<TextField
								placeholder="Email"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
								/>
								<TextField
								placeholder="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);
