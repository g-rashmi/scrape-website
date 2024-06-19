const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const path = require('path');

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
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
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
      name = extractCompanyName(url); // Extract company name from URL if title is not found
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

    await browser.close();

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
    throw error; // Re-throw the error to handle upstream
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
