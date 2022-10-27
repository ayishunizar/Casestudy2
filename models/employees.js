const mongoose = require('mongoose');

const schema = mongoose.Schema;

const employee_detail = new schema({

    name: String,
    position:String,
    location :String,
    salary : Number
})

const employeeData = mongoose.model('list',employee_detail)
module.exports = employeeData;
