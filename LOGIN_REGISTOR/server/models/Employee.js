const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema); // Changed "employee" to "Employee"
module.exports = EmployeeModel;
