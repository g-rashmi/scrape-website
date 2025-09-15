const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const { JSDOM } = require('jsdom');
require('dotenv').config();

function bufferToBase64(buffer) {
  return buffer.toString('base64');
}

const findUrlsByDomain = (document, domain) => {
  const urls = [];
  const elements = document.querySelectorAll('a[href], [href], [src]');
  elements.forEach((element) => {
    const attributeValue =
      element.href || element.src || element.getAttribute('href');
    if (attributeValue && attributeValue.toLowerCase().includes(domain)) {
      urls.push(attributeValue.trim());
    }
  });
  return urls;
};

const extractCompanyName = (url) => {
  const urlParts = url.split('/');
  const domain = urlParts[2];
  const domainParts = domain.split('.');
  return domainParts[0];
};

const cleanEmail = (email) => {
  const emailParts = email.split('?');
  return emailParts[0];
};

exports.scrape = async (url) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  try {
    const page = await browser.newPage();
    page.on('console', (msg) => {
      if (
        !msg
          .text()
          .includes(
            'Failed to load resource: the server responded with a status of',
          ) &&
        !msg.text().includes('css') &&
        !msg.text().includes('stylesheet')
      ) {
        console.log('PAGE LOG:', msg.text());
      }
    });

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 0,
    });

    const pageContent = await page.content();
    const dom = new JSDOM(pageContent);
    const document = dom.window.document;

    let name = document
      .querySelector('head title')
      ?.textContent.split(' ')[0]
      .trim();
    if (!name) {
      name = extractCompanyName(url);
    }

    const descriptionMeta = document.querySelector('meta[name="description"]');
    const description = descriptionMeta ? descriptionMeta.content : null;

    const logoLink = document.querySelector(
      'link[rel="shortcut icon"], link[rel="icon"]',
    );
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
    const email = emailElement
      ? cleanEmail(emailElement.href.replace('mailto:', '').trim())
      : null;

    const imageBuffer = await page.screenshot();
    const base64Image = bufferToBase64(imageBuffer);

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
      screenshot: `data:image/png;base64,${base64Image}`,
    };
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    await browser.close();
  }
};
