var mongoose = require('mongoose');
// Setup schema
var studentrecordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    register_number: {
        type: String,
        required: true
    },
    subject1: {
        type: Number,
        default: 0
    },
    subject2: {
        type: Number,
        default: 0
    },
    subject3: {
        type: Number,
        default: 0
    },
    totel: {
        type: Number,
        default: 0
    },
    delstatus: {
        type: Boolean,
        default: false
    },
    createdby: {
        type: String
    },
    createddate: {
        type: Date,
        default: Date.now
    },
    updatedby: {
        type: String,
        default: null
    },
    updateddate: {
        type: Date,
        default: null
    }
});
// Export model
var Studentrecord = module.exports = mongoose.model('studentrecords', studentrecordSchema);

module.exports.get = function (callback, limit) {
    Studentrecord.find({
        delstatus: false
    }, callback).sort({
        '_id': -1
    }).limit(limit);
}