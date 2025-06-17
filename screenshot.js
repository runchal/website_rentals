
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${__dirname}/index.html`);
  await page.screenshot({ path: 'homepage_screenshot.png', fullPage: true });
  await browser.close();
})();
