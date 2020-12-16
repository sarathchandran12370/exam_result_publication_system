var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Setup schema
var teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    delstatus: {
        type: Boolean,
        default: false
    },
    createdby: {
        type: String,
        default: null
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

teacherSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

teacherSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

// Export model
module.exports = mongoose.model('teacher_master', teacherSchema);