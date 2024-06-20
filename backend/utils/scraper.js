const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const path = require('path');
require("dotenv").config
const findUrlsByDomain = (document, domain) => {
  const urls = [];
  const elements = document.querySelectorAll('a[href], [href], [src]');
  elements.forEach(element => {
    const attributeValue = element.href || element.src || element.getAttribute('href');
    if (attributeValue && attributeValue.toLowerCase().includes(domain)) {
      urls.push(attributeValue.trim());
    }
  });
  return urls;
};

const extractCompanyName = (url) => {
  // Extract company name from URL
  const urlParts = url.split('/');
  const domain = urlParts[2]; // Get the domain part from the URL
  const domainParts = domain.split('.');
  return domainParts[0]; // Extract company name from domain
};

const cleanEmail = (email) => {
  // Remove any query parameters from the email address
  const emailParts = email.split('?');
  return emailParts[0];
};

exports.scrape = async (url) => {
  const browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox','--single-process','--no-zygote'] , executablePath:
    process.env.NODE_ENV === "production"
      ? process.env.PUPPETEER_EXECUTABLE_PATH
      : puppeteer.executablePath(),
 });
  try {
  
   
    const page = await browser.newPage();
  
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 0,
    });

    const pageContent = await page.content();
    const dom = new JSDOM(pageContent);
    const document = dom.window.document;

    let name = document.querySelector('head title')?.textContent.split(' ')[0].trim();
    if (!name) {
      name = extractCompanyName(url); 
    }

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = descriptionMeta ? descriptionMeta.content : null;

    const logoLink = document.querySelector('link[rel="shortcut icon"], link[rel="icon"]');
    const logo = logoLink ? logoLink.href : null;

    const facebook = findUrlsByDomain(document, 'facebook.com')[0] || null;
    const linkedin = findUrlsByDomain(document, 'linkedin.com')[0] || null;
    const twitter = findUrlsByDomain(document, 'twitter.com')[0] || null;
    const instagram = findUrlsByDomain(document, 'instagram.com')[0] || null;

    const addressElement = document.querySelector('address');
    const address = addressElement ? addressElement.textContent.trim() : null;

    const phoneElement = document.querySelector('a[href^="tel:"]');
    const phone = phoneElement ? phoneElement.textContent.trim() : null;

    const emailElement = document.querySelector('a[href^="mailto:"]');
    const email = emailElement ? cleanEmail(emailElement.href.replace('mailto:', '').trim()) : null;

    const screenshotDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'screenshot');
    require('./helpers').ensureDirExists(screenshotDir);
    const screenshotPath = path.join(screenshotDir, `${Date.now()}.png`);
    const screenshotRelativePath = `../screenshot/${Date.now()}.png`;

    await page.screenshot({ path: screenshotPath });

    return {
      name,
      domain: url,
      description,
      logo,
      facebook,
      linkedin,
      twitter,
      instagram,
      address,
      phone,
      email,
      screenshot: screenshotRelativePath,
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    res.send('something went wrong '+error)
    throw error; 

  } finally {
    
      await browser.close();
    
  }
};
