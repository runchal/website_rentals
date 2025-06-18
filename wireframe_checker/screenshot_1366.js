const { chromium } = require('playwright');

async function takeScreenshotAt1366() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Set viewport to exactly 1366px width
    await page.setViewportSize({ width: 1366, height: 768 });
    
    try {
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
        
        // Take full page screenshot at 1366px width
        await page.screenshot({ 
            path: '/Users/amitrunchal/apps/website_rentals/wireframe_checker/homepage_1366px.png',
            fullPage: true 
        });
        
        console.log('Screenshot taken at 1366px width');
        
        // Get the actual page height for comparison
        const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        console.log(`Page height at 1366px width: ${pageHeight}px`);
        
    } catch (error) {
        console.error('Error taking screenshot:', error);
    } finally {
        await browser.close();
    }
}

takeScreenshotAt1366();