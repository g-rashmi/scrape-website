const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors=require('cors');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/index');const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB setup
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

// Routes
app.use('/api', companyRoutes);

// Ensure the screenshots and downloads directories exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

ensureDirExists(path.join(__dirname, '../screenshots'));
ensureDirExists(path.join(__dirname, '../downloads'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
