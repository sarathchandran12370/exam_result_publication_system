// Import models
var Studentrecord = require('../model/studentrecordModel');
var jwt = require('jsonwebtoken');

//handle index action
exports.index = (req, res) => {
    Studentrecord.get(function (err, list) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Studentrecords retrieved successfully",
            data: list
        });
    });
};

// Handle create Studentrecord
exports.new = async (req, res) => {
    let token = await verifyToken(req)

    if (token == false) {
        res.json({
            status: "error",
            message: "Unauthorized request"
        });
    } else {
        let totel = req.body.subject1 + req.body.subject2 + req.body.subject3;

        var adStudentrecord = new Studentrecord();
        adStudentrecord.name = req.body.name;
        adStudentrecord.register_number = req.body.register_number;
        adStudentrecord.subject1 = req.body.subject1;
        adStudentrecord.subject2 = req.body.subject2;
        adStudentrecord.subject3 = req.body.subject3;
        adStudentrecord.totel = totel;
        adStudentrecord.createdby = req.body.email;

        adStudentrecord.save((err) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            } else {
                res.json({
                    status: "success",
                    message: 'Successfully Created',
                    data: adStudentrecord
                });
            }
        });
    }
};

// view a single Studentrecord by id
exports.view = function (req, res) {
    Studentrecord.findById(req.params.studentrecord_id, function (err, studentrecord) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: 'studentrecord details loading..',
                data: studentrecord
            });
        }

    });

};

//handle update studentrecord
exports.update = (req, res) => {
    let token = verifyToken(req)
    if (token == false) {
        res.json({
            status: "error",
            message: token.message
        });
    } else {
        Studentrecord.findById(req.params.studentrecord_id, (err, updateItem) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            } else {

                let totel = req.body.subject1 + req.body.subject2 + req.body.subject3;

                updateItem.updatedby = req.body.email;
                updateItem.updateddate = new Date();
                updateItem.name = req.body.name;
                updateItem.register_number = req.body.register_number;
                updateItem.subject1 = req.body.subject1;
                updateItem.subject2 = req.body.subject2;
                updateItem.subject3 = req.body.subject3;
                updateItem.totel = totel;

                updateItem.save((err) => {

                    if (err) {
                        res.json({
                            status: "error",
                            message: err,
                        });
                    } else {
                        res.json({
                            status: "success",
                            message: 'Updated Successfully',
                            data: updateItem
                        });
                    }

                });
            }

        });
    }
};

//hande delete student record
exports.delete = function (req, res) {
    let token = verifyToken(req)
    if (token == false) {
        res.json({
            status: "error",
            message: token.message
        });
    } else {
        Studentrecord.findById(req.params.studentrecord_id, function (err, ditItem) {
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
    }

};

async function verifyToken(req) {
    let token = req.query.token, tokendetial;
    console.log(req.query.token);

    await jwt.verify(token, 'secret', async (err, tokendata) => {
        if (err) {
            tokendetial = false
        }
        if (tokendata) {
            console.log(tokendata)
            tokendetial= tokendata;
        }
    })
    return await tokendetial
}