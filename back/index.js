const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');

// db Connect
mongoose.connect('mongodb://localhost/todos');

// Created Server
const server = express();
// Middelware
server.use( express.json() );


// Url permissions
server.use( cors( { origin: ['http://localhost:4200'] } ) );

// Get Resources Tasks
const taskRouter = require( './resources/tasks/index' );
server.use( '/tasks', taskRouter );


// Calling Server
server.listen( 5000 );
