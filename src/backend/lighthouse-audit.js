import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path'

(async () => {
  const BASE_URL = 'http://localhost:8080'; // Update to your actual base URL
  const __filename = new URL(import.meta.url).pathname; // Get the current file path
  const __dirname = path.dirname(__filename); // Derive the directory name
  const resultsDir = path.resolve(__dirname,'../../public/lighthouse-reports'); // Path for storing reports
  const resultsFilePath = path.resolve('./results.json'); // Path for summary JSON

  // Ensure the directory for reports exists
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  console.log('Crawling website...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(BASE_URL);

  // Extract unique internal links
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]'), (a) => a.href)
  );

  const uniqueLinks = Array.from(new Set(links)).filter((url) =>
    url.startsWith(BASE_URL)
  );

  console.log(`Discovered ${uniqueLinks.length} page(s):`, uniqueLinks);
  await browser.close();

  const results = {};

  for (const url of uniqueLinks) {
    console.log(`Auditing: ${url}`);
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    const options = {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'seo'],
      port: chrome.port,
    };

    try {
      const runnerResult = await lighthouse(url, options);

      // Save Lighthouse HTML report
      const reportHtml = runnerResult.report;
      const fileName = path.join(
        resultsDir,
        `${url.replace(BASE_URL, '').replace(/\//g, '_')}.html`
      );

      // Ensure reportHtml is a string
      if (Array.isArray(reportHtml)) {
        fs.writeFileSync(fileName, reportHtml.join('\n')); // Join array elements into a single string
      } else {
        fs.writeFileSync(fileName, reportHtml); // Directly write if it's already a string
      }
      console.log(`Report saved: ${fileName}`);

      // Collect results
      results[url] = runnerResult.lhr.categories;
    } catch (err) {
      console.error(`Error auditing ${url}:`, err.message);
    } finally {
      await chrome.kill();
    }
  }

  // Save summary results
  fs.writeFileSync(resultsFilePath, JSON.stringify(results, null, 2));
  console.log(`Summary saved to ${resultsFilePath}`);
})();
