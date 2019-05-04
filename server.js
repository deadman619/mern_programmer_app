const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const bodyParser = require('body-parser');
const passport = require('passport');

// Initialize app
const port = process.env.PORT || 5000;
const app = express();

// Body parser middleware (required to read request body)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Port info
app.listen(port, () => console.log(`Server running on port ${port}`));

// Connect to DB
mongoose.connect(db)
		.then(() => console.log('MongoDB connected successfully'))
		.catch((error) => console.log(error));

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
