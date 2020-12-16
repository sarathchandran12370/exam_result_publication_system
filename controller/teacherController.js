// Import models
var Teacher = require('../model/teacherModel');
var jwt = require('jsonwebtoken');

//handle view action
// exports.index = async (req, res) => {}

// Handle register teacher
exports.new = async (req, res) => {

    var addTeacher = new Teacher();
    addTeacher.email = req.body.email;
    addTeacher.name = req.body.name;
    addTeacher.password = Teacher.hashPassword(req.body.password),

        addTeacher.save((err) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            } else {
                res.json({
                    status: "success",
                    message: 'Successfully Created',
                    data: addTeacher
                });
            }
        });

}

// view a single teacher by id
exports.view = function (req, res) {
    Teacher.findById(req.params.teacher_id, function (err, teacher) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: 'teacher details loading..',
                data: teacher
            });
        }

    });

};

exports.login = function (req, res) {

    let promise = Teacher.findOne({
        email: req.body.email,
        delstatus: false
    }).exec();

    promise.then(function (doc) {
        if (doc) {
            if (doc.isValid(req.body.password)) {
                // generate token
                let token = jwt.sign({
                    email: doc.email
                }, 'secret', {
                    expiresIn: '3h'
                });

                res.json({
                    status: "success",
                    message: 'details loading..',
                    data: token
                });

            } else {
                res.json({
                    status: "invalid",
                    message: 'Invalid Credentials',
                });
            }
        } else {
            res.json({
                status: "invalid",
                message: 'User email is not registered.',
            });
        }
    });

    promise.catch(function (err) {
        res.json({
            status: "error",
            message: err,
        });
    })
}

//hande delete teacher
exports.delete = function (req, res) {
    Teacher.findById(req.params.teacher_id, function (err, ditItem) {
        if (!ditItem) {
            res.json({
                status: "error",
                message: "no record find with the given id"
            });
        }

        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        ditItem.delstatus = true;
        ditItem.save(function (err) {

            if (err) {
                res.json({
                    status: "error",
                    message: err
                });
            } else {
                res.json({
                    status: "success",
                    message: 'Deleted Successfully',
                    data: ditItem
                });
            }

        });


    });

};

// var decodedToken = '';

// function verifyToken(req, res, next) {
//     let token = req.query.token;

//     jwt.verify(token, 'secret', function (err, tokendata) {
//         if (err) {
//             return res.status(400).json({
//                 message: ' Unauthorized request'
//             });
//         }
//         if (tokendata) {
//             decodedToken = tokendata;
//             next();
//         }
//     })
// }