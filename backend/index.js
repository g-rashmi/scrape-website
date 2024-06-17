const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for scraping data
app.get('/scrape', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Adjust the timeout and waitUntil options for robust page load
        await page.goto(url, {
            waitUntil: 'networkidle0', // Wait until there are no more than 0 network connections for at least 500 ms
            timeout: 0, // Remove the timeout limit for loading the page
        });

        // Get the full HTML content after all data has been loaded
        const pageContent = await page.content();
        const scrapedData = await scrapePage(pageContent);
        
        await browser.close();
        
        res.json(scrapedData);
    } catch (error) {
        console.error('Error scraping page:', error);
        res.status(500).json({ error: 'Failed to scrape page' });
    }
});

// Function to scrape page using Cheerio
async function scrapePage(html) {
    const $ = cheerio.load(html);
    const data = {};

    // 1. Name (Title)
    data.name = $('head title').text().split(' ')[0].trim();

    // 2. Description (Meta Description)
    data.description = $('meta[name="description"]').attr('content');

    // 3. Company Logo
    data.logo = $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href');

    // 4. Social Media URLs (specific domains)
    data.linkedin = findUrlsByDomain($, 'linkedin.com');
    data.facebook = findUrlsByDomain($, 'facebook.com');
    data.twitter = findUrlsByDomain($, 'twitter.com');
    data.instagram = findUrlsByDomain($, 'instagram.com');

    // 5. Address, Phone Number, Email (Assuming they are on a contact page or similar)
    data.address = $('address').text().trim();
    data.phone = $('a[href^="tel:"]').first().text().trim();
    data.email = $('a[href^="mailto:"]').first().text().trim();

    return data;
}

// Helper function to find URLs containing a specific domain in any attribute
function findUrlsByDomain($, domain) {
    const urls = [];
    $('[href],[src]').each((index, element) => {
        const attributeValue = $(element).attr('href') || $(element).attr('src');
        if (attributeValue && attributeValue.toLowerCase().includes(domain)) {
            urls.push(attributeValue.trim());
        }
    });
    return urls;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
