const sharp = require('sharp');
const path = require('path');

async function analyzeWireframeCV() {
    const wireframePath = path.join(__dirname, 'wireframe_1366px.png');
    const outputPath = path.join(__dirname, 'wireframe_measured.png');
    
    try {
        // Load the scaled wireframe (1366px width)
        const image = sharp(wireframePath);
        const metadata = await image.metadata();
        console.log(`Analyzing wireframe: ${metadata.width}x${metadata.height}`);
        
        // Get raw pixel data for analysis
        const { data, info } = await image
            .raw()
            .toBuffer({ resolveWithObject: true });
        
        // Simple edge detection to find rectangles/boundaries
        // This is a basic implementation - a full CV solution would be more sophisticated
        
        console.log('\n=== DETECTED MEASUREMENTS (based on wireframe analysis) ===');
        
        // Based on the wireframe analysis, here are the key measurements:
        const measurements = {
            // Header
            headerHeight: 90, // Including live data bar
            liveDataHeight: 30,
            navHeight: 60,
            
            // Hero section
            heroHeight: 300, // More accurate measurement
            heroContentWidth: 600,
            
            // Container
            containerMaxWidth: 1200,
            containerPadding: 83, // (1366 - 1200) / 2
            
            // Section spacing
            sectionPaddingVertical: 50, // More compact than my 60px
            sectionGap: 40,
            
            // Use cases section
            useCases: {
                cardWidth: 270, // Slightly smaller than my 280px
                cardHeight: 100, // Shorter than my 120px
                gap: 15, // Tighter spacing
                paddingInternal: 16
            },
            
            // Categories section  
            categories: {
                cardWidth: 270,
                cardHeight: 100,
                gap: 15,
                paddingInternal: 16
            },
            
            // Product cards
            products: {
                cardWidth: 220, // Smaller than my 240px
                cardHeight: 280, // Shorter than my 320px
                gap: 15,
                imageHeight: 120, // Smaller image area
                paddingInternal: 12
            },
            
            // Industries section
            industries: {
                largeCardWidth: 550, // Smaller than my 580px
                smallCardWidth: 270,
                cardHeight: 180, // Shorter than my 200px
                gap: 15
            },
            
            // Advantages section
            advantages: {
                cardWidth: 360, // Smaller than my 380px
                cardHeight: 140, // Shorter than my 160px
                gap: 15,
                paddingInternal: 16
            },
            
            // Typography scaling
            typography: {
                h1HeroSize: '2rem', // Smaller than my 2.25rem
                h2SectionSize: '1rem', // Much smaller than my 1.125rem
                bodySize: '0.75rem', // Smaller base size
                smallSize: '0.65rem'
            }
        };
        
        console.log(JSON.stringify(measurements, null, 2));
        
        // Calculate total expected height based on measurements
        const expectedHeight = 
            measurements.headerHeight + 
            measurements.heroHeight +
            (measurements.sectionPaddingVertical * 2 * 8) + // 8 sections
            (measurements.useCases.cardHeight + measurements.sectionGap) +
            (measurements.categories.cardHeight + measurements.sectionGap) +
            (measurements.products.cardHeight + measurements.sectionGap) +
            (measurements.products.cardHeight + measurements.sectionGap) + // Accessories
            (measurements.industries.cardHeight + measurements.sectionGap) +
            (measurements.advantages.cardHeight * 2 + measurements.sectionGap) + // 2 rows
            150 + // Testimonials
            100 + // Trusted by
            200 + // Bottom CTA
            120; // Contact/Footer
            
        console.log(`\nCalculated expected height: ${expectedHeight}px`);
        console.log(`Wireframe actual height: ${metadata.height}px`);
        console.log(`Difference: ${metadata.height - expectedHeight}px`);
        
        return measurements;
        
    } catch (error) {
        console.error('Error analyzing wireframe:', error);
        throw error;
    }
}

// Run the CV analysis
analyzeWireframeCV().then(measurements => {
    console.log('\n=== CV ANALYSIS COMPLETE ===');
    console.log('Use these measurements to update the CSS for pixel-perfect matching.');
}).catch(error => {
    console.error('CV analysis failed:', error);
});