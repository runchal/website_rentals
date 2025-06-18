const fs = require('fs');
const path = require('path');

function parseElementsMap() {
    const csvPath = '/Users/amitrunchal/apps/helper_wireframe_checker/Sample/homepage_elements_map.csv';
    const cssOutputPath = path.join(__dirname, 'pixel_perfect_wireframe.css');
    
    try {
        const csvContent = fs.readFileSync(csvPath, 'utf8');
        const lines = csvContent.trim().split('\n');
        const header = lines[0].split(',');
        
        console.log('=== WIREFRAME ELEMENTS MAP ANALYSIS ===\n');
        
        const elements = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= 6) {
                const element = {
                    id: values[0],
                    type: values[1],
                    x: parseInt(values[2]),
                    y: parseInt(values[3]),
                    width: parseInt(values[4]),
                    height: parseInt(values[5])
                };
                elements.push(element);
                console.log(`${element.id}: ${element.width}x${element.height} @ (${element.x}, ${element.y})`);
            }
        }
        
        // Analyze key sections
        console.log('\n=== KEY SECTION ANALYSIS ===');
        
        const navbar = elements.find(e => e.id === 'navbar');
        const hero = elements.find(e => e.id === 'hero');
        const batteriesHeader = elements.find(e => e.id === 'batteries_header');
        const accessoriesHeader = elements.find(e => e.id === 'accessories_header');
        const industriesHeader = elements.find(e => e.id === 'industries_header');
        const advantagesHeader = elements.find(e => e.id === 'advantages_header');
        
        console.log(`Navbar: ${navbar.height}px height`);
        console.log(`Hero: ${hero.height}px height`);
        console.log(`Batteries section starts at: ${batteriesHeader.y}px`);
        console.log(`Accessories section starts at: ${accessoriesHeader.y}px`);
        console.log(`Industries section starts at: ${industriesHeader.y}px`);
        console.log(`Advantages section starts at: ${advantagesHeader.y}px`);
        
        // Calculate section spacing
        const batteryToAccessory = accessoriesHeader.y - batteriesHeader.y;
        const accessoryToIndustry = industriesHeader.y - accessoriesHeader.y;
        const industryToAdvantage = advantagesHeader.y - industriesHeader.y;
        
        console.log(`\nSection spacing:`);
        console.log(`Battery to Accessory: ${batteryToAccessory}px`);
        console.log(`Accessory to Industry: ${accessoryToIndustry}px`);
        console.log(`Industry to Advantage: ${industryToAdvantage}px`);
        
        // Analyze card dimensions
        console.log('\n=== CARD DIMENSIONS ===');
        
        const batteryCard = elements.find(e => e.id === 'battery_card_1');
        const accessoryCard = elements.find(e => e.id === 'accessory_card_1');
        const industryCard = elements.find(e => e.id === 'industry_card_1');
        const advantageCard = elements.find(e => e.id === 'advantage_card_1');
        
        console.log(`Battery cards: ${batteryCard.width}x${batteryCard.height}px`);
        console.log(`Accessory cards: ${accessoryCard.width}x${accessoryCard.height}px`);
        console.log(`Industry cards: ${industryCard.width}x${industryCard.height}px`);
        console.log(`Advantage cards: ${advantageCard.width}x${advantageCard.height}px`);
        
        // Calculate gaps between cards
        const batteryCard2 = elements.find(e => e.id === 'battery_card_2');
        const accessoryCard2 = elements.find(e => e.id === 'accessory_card_2');
        const industryCard2 = elements.find(e => e.id === 'industry_card_2');
        const advantageCard2 = elements.find(e => e.id === 'advantage_card_2');
        
        const batteryGap = batteryCard2.x - (batteryCard.x + batteryCard.width);
        const accessoryGap = accessoryCard2.x - (accessoryCard.x + accessoryCard.width);
        const industryGap = industryCard2.x - (industryCard.x + industryCard.width);
        const advantageGap = advantageCard2.x - (advantageCard.x + advantageCard.width);
        
        console.log(`\nCard gaps:`);
        console.log(`Battery cards gap: ${batteryGap}px`);
        console.log(`Accessory cards gap: ${accessoryGap}px`);
        console.log(`Industry cards gap: ${industryGap}px`);
        console.log(`Advantage cards gap: ${advantageGap}px`);
        
        // Generate precise CSS
        const css = generatePreciseCSS(elements);
        fs.writeFileSync(cssOutputPath, css);
        console.log(`\nPrecise CSS generated: ${cssOutputPath}`);
        
        return elements;
        
    } catch (error) {
        console.error('Error parsing elements map:', error);
        throw error;
    }
}

function generatePreciseCSS(elements) {
    const navbar = elements.find(e => e.id === 'navbar');
    const hero = elements.find(e => e.id === 'hero');
    const batteryCard = elements.find(e => e.id === 'battery_card_1');
    const accessoryCard = elements.find(e => e.id === 'accessory_card_1');
    const industryCard = elements.find(e => e.id === 'industry_card_1');
    const advantageCard = elements.find(e => e.id === 'advantage_card_1');
    
    // Calculate gaps
    const batteryCard2 = elements.find(e => e.id === 'battery_card_2');
    const accessoryCard2 = elements.find(e => e.id === 'accessory_card_2');
    const industryCard2 = elements.find(e => e.id === 'industry_card_2');
    const advantageCard2 = elements.find(e => e.id === 'advantage_card_2');
    
    const batteryGap = batteryCard2.x - (batteryCard.x + batteryCard.width);
    const accessoryGap = accessoryCard2.x - (accessoryCard.x + accessoryCard.width);
    const industryGap = industryCard2.x - (industryCard.x + industryCard.width);
    const advantageGap = advantageCard2.x - (advantageCard.x + advantageCard.width);
    
    return `/* PIXEL PERFECT CSS - Generated from Wireframe Elements Map */

:root {
    --container-padding: 24px; /* Based on wireframe margins */
}

/* Header - Exact wireframe dimensions */
header {
    height: ${navbar.height}px;
}

/* Hero Section - Exact wireframe dimensions */
.hero-wireframe {
    height: ${hero.height}px;
    background: var(--dark-bg);
    color: white;
    display: flex;
    align-items: center;
    text-align: center;
}

/* Use Cases Section - Battery cards mapping */
.suggested-use-cases-wireframe {
    padding: 40px 0;
}

.use-cases-row {
    display: grid;
    grid-template-columns: repeat(3, ${batteryCard.width}px);
    gap: ${batteryGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.use-case-small {
    width: ${batteryCard.width}px;
    height: ${batteryCard.height}px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* Categories Section - Accessory cards mapping */
.categories-wireframe {
    padding: 40px 0;
    background: #fafafa;
}

.categories-row {
    display: grid;
    grid-template-columns: repeat(4, ${accessoryCard.width}px);
    gap: ${accessoryGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.category-small {
    width: ${accessoryCard.width}px;
    height: ${accessoryCard.height}px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Explore Batteries - Battery cards exact */
.explore-batteries {
    padding: 40px 0;
}

.explore-batteries .product-grid {
    display: grid;
    grid-template-columns: repeat(3, ${batteryCard.width}px);
    gap: ${batteryGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.explore-batteries .product-card {
    width: ${batteryCard.width}px;
    height: ${batteryCard.height}px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

/* Accessories - Accessory cards exact */
.accessories-preview {
    padding: 40px 0;
    background: #fafafa;
}

.accessories-preview .product-grid {
    display: grid;
    grid-template-columns: repeat(4, ${accessoryCard.width}px);
    gap: ${accessoryGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.accessories-preview .product-card {
    width: ${accessoryCard.width}px;
    height: ${accessoryCard.height}px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
}

/* Industries - Industry cards exact */
.industries-promo {
    padding: 40px 0;
}

.industry-promo-grid {
    display: grid;
    grid-template-columns: repeat(4, ${industryCard.width}px);
    gap: ${industryGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.industry-promo-card {
    width: ${industryCard.width}px;
    height: ${industryCard.height}px;
    background: #f0f0f0;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    align-items: flex-end;
}

/* Advantages - Advantage cards exact */
.advantages {
    padding: 40px 0;
    background: #fafafa;
}

.advantages-grid {
    display: grid;
    grid-template-columns: repeat(3, ${advantageCard.width}px);
    grid-template-rows: repeat(2, ${advantageCard.height}px);
    gap: ${advantageGap}px;
    justify-content: start;
    margin-left: var(--container-padding);
}

.advantage-card {
    width: ${advantageCard.width}px;
    height: ${advantageCard.height}px;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Section headers - Based on wireframe positioning */
.suggested-use-cases-wireframe h2,
.categories-wireframe h2,
.section-header h2,
.industries-promo h2,
.advantages h2 {
    font-size: 1rem;
    margin: 0 0 20px var(--container-padding);
    font-weight: 600;
}

/* Container adjustments */
.container {
    max-width: 1366px;
    margin: 0 auto;
    padding: 0;
}`;
}

// Run the analysis
parseElementsMap().then(elements => {
    console.log('\n=== ELEMENTS MAP PARSING COMPLETE ===');
}).catch(error => {
    console.error('Parsing failed:', error);
});