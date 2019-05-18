import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Check for token
if(localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decodedData = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decodedData));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if(decodedData.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

function App() {
  return (
  	<Provider store={store}>
	  	<BrowserRouter>
		    <div className="App">
		    	<Navbar/>
		    	<Route exact path="/" component={Landing} />
		    	<div className="container">
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
		    	</div>
		    </div>
	    </BrowserRouter>
    </Provider>
  );
}

export default App;