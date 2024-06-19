const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({ 
  _id:mongoose.Types.ObjectId,
  name: { type: String, required: true },
  domain: { type: String }, 
  description: { type: String },
  logo: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  screenshot: { type: String }
});

module.exports = mongoose.model('Company', companySchema);
