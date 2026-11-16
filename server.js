import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

const app = express();

// Temporary in-memory array to store data
const patientsDatabase = [];

// Third-party middleware
app.use(cors());
app.use(morgan("dev"));

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
const logger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms\n`;
    fs.appendFile("Server.log", log, (err) => {
      if (err) {
        console.error("Failed to write request log:", err);
      }
    });
  });
  next();
};
app.use(logger);

// Route-specific validation middleware
const validate = (req, res, next) => {
  const { name, gender, ward } = req.body;
  if (!name || !gender || !ward) {
    const err = new Error("Patient details are missing");
    err.statusCode = 400;
    return next(err);
  }
  next();
};

// Create patient (POST)
app.post("/api/v1/patients", validate, (req, res) => {
  const { name, gender, ward } = req.body;
  
  // Create a new patient object with a unique ID
  const newPatient = {
    id: (patientsDatabase.length + 1).toString(),
    name,
    gender,
    ward
  };

  // Save to our array
  patientsDatabase.push(newPatient);

  res.status(201).json({ 
    message: "Patient added successfully", 
    patient: newPatient 
  });
});

// Read all patients (GET)
app.get("/api/v1/patients", (req, res) => {
  const { ward } = req.query;
  
  if (ward) {
    const filteredPatients = patientsDatabase.filter(p => p.ward.toLowerCase() === ward.toLowerCase());
    return res.status(200).json({
      message: `Patients of ${ward} ward fetched successfully`,
      data: filteredPatients
    });
  }

  // Return the actual array of patients
  res.status(200).json({
    message: "All patients fetched successfully",
    data: patientsDatabase
  });
});

// Read one patient (GET)
app.get("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsDatabase.find(p => p.id === id);

  if (!patient) {
    return res.status(404).send(`Patient with id ${id} not found`);
  }

  res.status(200).json({
    message: `Patient with id ${id} fetched successfully`,
    data: patient
  });
});

// Update one patient (PUT)
app.put("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsDatabase.find(p => p.id === id);

  if (!patient) {
    return res.status(404).send(`Patient with id ${id} not found`);
  }

  // Update details with whatever is sent in the body, or keep old details
  patient.name = req.body.name || patient.name;
  patient.gender = req.body.gender || patient.gender;
  patient.ward = req.body.ward || patient.ward;

  res.status(200).json({
    message: `Patient with id ${id} updated successfully`,
    data: patient
  });
});

// Delete one patient (DELETE)
app.delete("/api/v1/patients/:id", (req, res) => {
  const { id } = req.params;
  const index = patientsDatabase.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).send(`Patient with id ${id} not found`);
  }

  const deletedPatient = patientsDatabase.splice(index, 1);

  res.status(200).json({
    message: `Patient with id ${id} deleted successfully`,
    data: deletedPatient[0]
  });
});

// 404 middleware
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).send(message);
});

// Start server
const PORT = 6500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
