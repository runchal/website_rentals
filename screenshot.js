const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const fromFile = process.argv[2] || 'index.html';
  const clickSelector = process.argv[3];
  const screenshotName = process.argv[4] || fromFile.replace('.html', '.png');

  await page.goto(`file://${__dirname}/${fromFile}`);

  if (clickSelector) {
    await page.click(clickSelector);
    await page.waitForTimeout(1000); // Increased timeout for modal
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: screenshotName, fullPage: true });
  await browser.close();
})();