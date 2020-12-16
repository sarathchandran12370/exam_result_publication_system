//initialize express routes

let router = require('express').Router();

//import  gener controller

var studentrecord = require('../controller/studentrecordController');


router.route('/')
    .get(studentrecord.index)
    .post(studentrecord.new);

router.route('/:studentrecord_id')
    .get(studentrecord.view)
    .patch(studentrecord.update)
    .put(studentrecord.update)
    .delete(studentrecord.delete);

// Export API routes 
module.exports = router;