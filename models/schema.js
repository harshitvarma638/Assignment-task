const mongoose = require('mongoose');

const accountCreation = mongoose.Schema({
    first_name: {type: String,required: true},
    last_name: {type: String,required: true},
    date_of_birth: {type: Date,required: true},
    gender: {type: String,required: true},
    mobile_no: {type: String,required: true,match: [/^(\+91)?[6-9]\d{9}$/]},
    guardian_no: {type: String,match: [/^(\+91)?[6-9]\d{9}$/]},
    address_line1: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
    pinCode: {type: String,required: true,match: [/^\d{6}$/]},
    referral_code: {type: String},
    school: {type: String,required: true},
    class: {type: String,required: true},
    board: {type: String,required: true},
    subjects: {type: [String],default: [],required: true}
});

module.exports = mongoose.model('accountCreation', accountCreation);