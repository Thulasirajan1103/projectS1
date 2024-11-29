const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const multer = require("multer");

// Middleware
app.use(express.json());
app.use(cors());

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/studentDb")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const upload = multer({ dest: "uploads/" });

const studentSchema = new mongoose.Schema({
  number: String,
  firstName: String,
  lastName: String,
  email: String,
  dept: String,
  year: String,
  gender: String,
  dob: Date,
  file: {
    name: String,
    url: String,
  },
});
const Student = mongoose.model("Student", studentSchema);

// Check connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const itemRoutes = require("./routes/items");
app.use("/api/items", itemRoutes);

app.post("/api/items", upload.single("file"), async (req, res) => {
  try {
    const { firstName, lastName, gender, number, year, email, dob, dept } =
      req.body;

    const newStudent = new Student({
      number,
      firstName,
      lastName,
      email,
      dept,
      year,
      gender,
      dob,
      file: req.file
        ? { name: req.file.originalname, url: req.file.path }
        : null, // Save file details
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Example admin credentials (you should use a database)
  const adminUsername = "admin";
  const adminPassword = "password";

  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    return res.json({ success: true, token });
  }

  return res
    .status(401)
    .json({ success: false, message: "Invalid credentials" });
});

// Example attendance retrieval for admin
app.get("/api/attendance", (req, res) => {
  // Fetch attendance records from the database
  // Example data
  const attendanceRecords = [
    { id: 1, studentId: "S001", date: "2024-10-01", status: "Present" },
    { id: 2, studentId: "S002", date: "2024-10-01", status: "Absent" },
    // Add more records as necessary
  ];
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  res.json(attendanceRecords);
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
