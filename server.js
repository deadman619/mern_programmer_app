const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const port = process.env.PORT || 5000;
const app = express();

// Connect to DB
mongoose.connect(db)
		.then(() => console.log('MongoDB connected successfully'))
		.catch((error) => console.log(error));

app.get('/', (req, res) => res.send('Hello!'));
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));

