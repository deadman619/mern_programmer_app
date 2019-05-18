import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
	.then(res => history.push('/login'))
	.catch(error => 
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		})
	);
};

export const loginUser = userData => dispatch => {
	axios.post('/api/users/login', userData)
	.then(res => {
		const {token} = res.data;
		// Save to local storage, only accepts strings
		localStorage.setItem('jwtToken', token);
		// Set token to auth header
		setAuthToken(token);
		// Decode token
		const decodedData = jwt_decode(token);
		// Set current user
		dispatch(setCurrentUser(decodedData));
	})
	.catch(error =>
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data
		})
	);
};

export const setCurrentUser = decodedData => {
	return {
		type: SET_CURRENT_USER,
		payload: decodedData
	}
}

export const logoutUser = () => dispatch => {
	// Remove token
	localStorage.removeItem('jwtToken');
	// Remove auth header
	setAuthToken(false);
	// Remove current user
	dispatch(setCurrentUser({}));
}