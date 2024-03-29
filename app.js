const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connect to Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
})

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
})

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//  Body Parser Middleware
app.use(bodyParser.json());

// Password Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.use('/users', users);


// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});