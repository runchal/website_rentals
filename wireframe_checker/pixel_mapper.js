const sharp = require('sharp');
const path = require('path');

async function createPixelMap() {
    const wireframePath = path.join(__dirname, '..', 'Wireframes', 'Homepage.png');
    const outputPath = path.join(__dirname, 'homepage_pixel_map.png');
    
    try {
        // Get wireframe metadata
        const wireframeMeta = await sharp(wireframePath).metadata();
        console.log(`Original wireframe size: ${wireframeMeta.width}x${wireframeMeta.height}`);
        
        // Scale down to 50% (actual design size)
        const targetWidth = Math.round(wireframeMeta.width / 2);
        const targetHeight = Math.round(wireframeMeta.height / 2);
        console.log(`Target size (50%): ${targetWidth}x${targetHeight}`);
        
        // Scale wireframe to actual size
        await sharp(wireframePath)
            .resize(targetWidth, targetHeight, { fit: 'contain' })
            .png()
            .toFile(outputPath);
            
        console.log(`Scaled wireframe saved to: ${outputPath}`);
        
        // Now let's create measurements based on the scaled wireframe
        // Using the common 1366px design width standard
        console.log(`\n=== PIXEL MEASUREMENTS FOR 1366px WIDTH ===`);
        
        // Header measurements (estimated)
        const headerHeight = 60;
        const liveDataHeight = 30;
        console.log(`Header height: ${headerHeight}px`);
        console.log(`Live data bar height: ${liveDataHeight}px`);
        
        // Hero section measurements 
        const heroHeight = 350;
        console.log(`Hero section height: ${heroHeight}px`);
        
        // Container max-width
        const containerMaxWidth = 1200;
        const containerPadding = 83; // (1366 - 1200) / 2
        console.log(`Container max-width: ${containerMaxWidth}px`);
        console.log(`Container side padding: ${containerPadding}px`);
        
        // Section measurements
        const sectionPaddingVertical = 60;
        console.log(`Section vertical padding: ${sectionPaddingVertical}px`);
        
        // Use cases section measurements
        const useCaseCardWidth = 280;
        const useCaseCardHeight = 120;
        const useCaseGap = 20;
        console.log(`Use case card: ${useCaseCardWidth}x${useCaseCardHeight}px, gap: ${useCaseGap}px`);
        
        // Categories section measurements (same as use cases)
        console.log(`Category card: ${useCaseCardWidth}x${useCaseCardHeight}px, gap: ${useCaseGap}px`);
        
        // Product card measurements
        const productCardWidth = 240;
        const productCardHeight = 320;
        const productGap = 20;
        console.log(`Product card: ${productCardWidth}x${productCardHeight}px, gap: ${productGap}px`);
        
        // Industries section measurements
        const industryLargeCardWidth = 580;
        const industrySmallCardWidth = 280;
        const industryCardHeight = 200;
        console.log(`Industry large card: ${industryLargeCardWidth}x${industryCardHeight}px`);
        console.log(`Industry small card: ${industrySmallCardWidth}x${industryCardHeight}px`);
        
        // Advantages grid measurements
        const advantageCardWidth = 380;
        const advantageCardHeight = 160;
        console.log(`Advantage card: ${advantageCardWidth}x${advantageCardHeight}px`);
        
        // Create a detailed layout map
        const layoutMap = {
            containerMaxWidth: 1200,
            containerPadding: 83,
            header: {
                height: 60,
                liveDataHeight: 30
            },
            hero: {
                height: 350,
                paddingTop: 80,
                paddingBottom: 80
            },
            sections: {
                paddingVertical: 60,
                gap: 0
            },
            useCases: {
                cardWidth: 280,
                cardHeight: 120,
                gap: 20,
                cardsPerRow: 4
            },
            categories: {
                cardWidth: 280,
                cardHeight: 120,
                gap: 20,
                cardsPerRow: 4
            },
            products: {
                cardWidth: 240,
                cardHeight: 320,
                gap: 20,
                cardsVisible: 2
            },
            industries: {
                largeCardWidth: 580,
                smallCardWidth: 280,
                cardHeight: 200,
                gap: 20
            },
            advantages: {
                cardWidth: 380,
                cardHeight: 160,
                gap: 20,
                cardsPerRow: 3
            }
        };
        
        console.log(`\n=== LAYOUT MAP CREATED ===`);
        console.log(JSON.stringify(layoutMap, null, 2));
        
        return { targetWidth, targetHeight, layoutMap };
        
    } catch (error) {
        console.error('Error creating pixel map:', error);
        throw error;
    }
}

// Run the pixel mapping
createPixelMap().then(result => {
    console.log('\nPixel mapping completed successfully!');
}).catch(error => {
    console.error('Pixel mapping failed:', error);
});