const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user => {
        if (user) {
            if(user.password === password){
                res.json("Success") // Changed to "Success"
            } else {
                res.json("Incorrect") // Changed to "Incorrect"
            } 
        } else {
            res.json("Not Registered") // Changed to "Not Registered"
        }
    })
    .catch(err => res.status(500).json("Error: " + err)); // Added catch for any errors
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body; // Destructure the request body
  EmployeeModel.create({ name, email, password }) // Pass the extracted fields to create
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json(err)); // Handle errors
});

app.listen(3001, () => {
  console.log("Server is running");
});
