const mongoose = require("mongoose");
const express =  require("express");
const cors = require("cors");
const Student = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

let students = [
    {
        id: 1,
        name: "Juan Dela Cruz",
        course: "BSIT",
        age: 20
    }
]

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post("/students", async (req, res) => {
    const {name, course, age} = req.body;
    const newStudent = new Student({name, course, age});
    await newStudent.save();
    res.json(newStudent);
});

app.put("/students/:id", async (req, res) => {
    const {id} = req.params;
    const {name, course, age} = req.body;
    const updateStudent = await Student.findByIdAndUpdate(id, {name, course, age}, {new: true});
    res.json(updateStudent);
});

app.delete("/students/:id", async (req, res) => {
    const {id} = req.params;
    const deleteStudent = await Student.findByIdAndDelete(id);
    res.json({message: "Student Gone"});
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});