import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import store from './store';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';
import CreateProfile from './components/layout/CreateProfile';
import EditProfile from './components/layout/EditProfile';
import AddExperience from './components/layout/AddExperience';
import AddEducation from './components/layout/AddEducation';
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
		store.dispatch(clearCurrentProfile());
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
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<PrivateRoute exact path="/create-profile" component={CreateProfile} />
					<PrivateRoute exact path="/edit-profile" component={EditProfile} />
					<PrivateRoute exact path="/add-experience" component={AddExperience} />
					<PrivateRoute exact path="/add-education" component={AddEducation} />
		    	</div>
		    </div>
	    </BrowserRouter>
    </Provider>
  );
}

export default App;
