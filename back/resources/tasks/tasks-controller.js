const { response } = require('express');
const todoModel = require('./tasks-model');

// Modules exports
module.exports = {

    getAllTasks : getAllTasks,
    getTasks : getTasks,
    postTasks : postTasks,
    patchTask : patchTask,
    deleteAllTask : deleteAllTask,
    deleteTask : deleteTask

}


// Functions Section

function getAllTasks( req, res ){

    todoModel.find().then( alltodos => {

        console.log(alltodos);
        res.json(alltodos);

    });

};

function getTasks( req, res ){

    let idTask = req.params.id;
    todoModel.findOne({ id: idTask })
            .then( getOneTodo => {

                console.log('Get todo ' + idTask);
                res.json(getOneTodo);

            });

};

function postTasks( req, res ){

    let body = req.body;
    // generateUUID()
    let idGenerator = Math.round(Math.random() * (100 - 1) + 1);
    todoModel.create( {

        "id": idGenerator,
        "title": body.title,
        "owner": body.owner,
        // 'createdAt': new Date().toLocaleDateString( 'en-US' )
        "completed": false

    } ).then( newTodo => {

        console.log(newTodo);
        res.send(newTodo);

    } );

    // setDataTask( tasks );

};

function patchTask( req, res ){

    let idTask = req.params.id;
    let body = req.body;

    todoModel.updateOne( { id: idTask }, { $set : body }, /*{runValidators: true}*/ )
            .then( todoUpdated => {

                console.log('Updated todo ' + idTask);
                res.json(todoUpdated);

            } );

    // setDataTask( tasks );

};

function deleteAllTask( req, res ){

    todoModel.deleteMany().then( allTodoDeleted => {

        console.log('All todos deleted');
        res.json(allTodoDeleted);

    } );


    // setDataTask( tasks );

}

function deleteTask( req, res ){

    let idTask = req.params.id;
    todoModel.deleteOne( { id : idTask } ).then( todoDeleted => {

        console.log( 'Deleted todo ' + idTask );
        res.json(todoDeleted);

    } );

    // setDataTask( tasks );

}


// Try Function to generate uniq id
// function generateUUID() {
//     var d = new Date().getTime();
//     var uuid = 'xx4xxyxx'.replace(/[xy]/g, function (c) {
//         var r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
//     });
//     return uuid;
// }
