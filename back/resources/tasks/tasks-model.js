const mongoose = require('mongoose');

// Made Schema of db
var todoSchema = mongoose.Schema({

    id: Number,
    title: String,
    owner: String,
    completed: Boolean

});

var todo = mongoose.model( 'todo', todoSchema );
    
module.exports = todo;