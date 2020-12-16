//initialize express routes

let router = require('express').Router();

//import  teacher controller

var teacherController = require('../controller/teacherController');

// teacher routes

router.route('/')
    //   .get(teacherController.index)
    .post(teacherController.new);

router.route('/:teacher_id')
    .get(teacherController.view)
    .delete(teacherController.delete)

router.route('/user/login')
    .post(teacherController.login);
    
// Export API routes 
module.exports = router;