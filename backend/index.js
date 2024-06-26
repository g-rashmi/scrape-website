const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/index');
const serverless = require('serverless-http');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 400;

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


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports.handler = serverless(app);