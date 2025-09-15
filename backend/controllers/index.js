const Company = require('../models/company');
const scraper = require('../utils/scraper');
const mongoose = require('mongoose');
const convertDomainToUrl = (domain) => {
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    return `https://${domain}`;
  }
  return domain;
};

exports.scrapeCompany = async (req, res) => {
  const { domain } = req.body;
  const url = convertDomainToUrl(domain);

  if (!url || !domain) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const companyData = await scraper.scrape(url);
    companyData._id = new mongoose.Types.ObjectId();

    const company = new Company(companyData);
    await company.save();
    res.json({ companyid: companyData._id });
  } catch (error) {
    console.error('Error scraping page:', error);
    res.status(500).json({ error: 'Failed to scrape page' });
    process.exit(1);
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ObjectId format' });
    }

    const company = await Company.findOne({ _id: req.params.id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.json({ company: company, success: true });
  } catch (error) {
    console.error('Error fetching company details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
exports.deleteCompanies = async (req, res) => {
  const { ids } = req.body;
  await Company.deleteMany({ _id: { $in: ids } });
  res.json({ success: true });
};
