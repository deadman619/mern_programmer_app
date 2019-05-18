import axios from 'axios';

const setAuthToken = token => {
	if(token) {
		// Set authorization token
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// Delete authorization token
		delete axios.defaults.headers.common['Authorization'];
	}
}

export default setAuthToken;