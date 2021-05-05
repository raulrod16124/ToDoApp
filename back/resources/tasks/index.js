var router = require('express').Router();

const controller = require('../tasks/tasks-controller');

// Router functions

// Get all tasks
router.get( '/', controller.getAllTasks );

// Get tasks
router.get( '/:id', controller.getTasks );

// // Get tasks
// router.get( '/:username', controller.getTasksOfUser );

// Post task
router.post( '/', controller.postTasks );

// Patch task
router.patch( '/:id', controller.patchTask );

// Delete all task
router.delete( '/', controller.deleteAllTask );

// Delete task
router.delete( '/:id', controller.deleteTask );


// Export Module
module.exports = router;

