const express = require('express');
const router = express.Router();
const companyController = require('../controllers/index');
const company=require('../models/company')
router.post('/scrape', companyController.scrapeCompany);

router.get('/company/:id', companyController.getCompanyDetails);
router.post('/delete', companyController.deleteCompanies);

 

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || ""; // Get the filter query parameter, default to empty string if not provided

  try {
    const companies = await company.find({
      $or: [
        { domain: { $regex: filter, $options: 'i' } }, // Case-insensitive regex match for domain
        { name: { $regex: filter, $options: 'i' } },   // Case-insensitive regex match for name
      ],
    });

    return res.json({companies: companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
