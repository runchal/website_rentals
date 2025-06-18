const sharp = require('sharp');
const path = require('path');

async function compare1366() {
    const wireframePath = path.join(__dirname, '..', 'Wireframes', 'Homepage.png');
    const currentPath = path.join(__dirname, 'homepage_1366px.png');
    const wireframeScaledPath = path.join(__dirname, 'wireframe_1366px.png');
    const overlayPath = path.join(__dirname, 'overlay_1366px.png');
    const sideBySidePath = path.join(__dirname, 'side_by_side_1366px.png');
    
    try {
        // Get current implementation metadata
        const currentMeta = await sharp(currentPath).metadata();
        console.log(`Current implementation: ${currentMeta.width}x${currentMeta.height}`);
        
        // Scale wireframe to exactly 1366px width (50% of original)
        const wireframeMeta = await sharp(wireframePath).metadata();
        const targetWidth = 1366;
        const targetHeight = Math.round((wireframeMeta.height * targetWidth) / wireframeMeta.width);
        
        console.log(`Original wireframe: ${wireframeMeta.width}x${wireframeMeta.height}`);
        console.log(`Scaled wireframe: ${targetWidth}x${targetHeight}`);
        
        // Create scaled wireframe
        await sharp(wireframePath)
            .resize(targetWidth, targetHeight, { fit: 'contain' })
            .png()
            .toFile(wireframeScaledPath);
        
        console.log(`Wireframe scaled to 1366px width`);
        
        // Create overlay comparison
        const maxHeight = Math.max(currentMeta.height, targetHeight);
        
        // Tint wireframe purple and current implementation green
        const tintedWireframe = await sharp(wireframeScaledPath)
            .resize(1366, maxHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .tint({ r: 128, g: 0, b: 255 }) // Purple tint
            .png()
            .toBuffer();
        
        const tintedCurrent = await sharp(currentPath)
            .resize(1366, maxHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
            .tint({ r: 0, g: 255, b: 0 }) // Green tint
            .png()
            .toBuffer();
        
        // Create overlay
        await sharp({
            create: {
                width: 1366,
                height: maxHeight,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
        .composite([
            { input: tintedWireframe, blend: 'screen' },
            { input: tintedCurrent, blend: 'screen' }
        ])
        .png()
        .toFile(overlayPath);
        
        // Create side-by-side comparison
        await sharp({
            create: {
                width: 1366 * 2 + 20, // 20px gap
                height: maxHeight,
                channels: 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }
        })
        .composite([
            { 
                input: await sharp(wireframeScaledPath)
                    .resize(1366, maxHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .png()
                    .toBuffer(),
                left: 0, 
                top: 0 
            },
            { 
                input: await sharp(currentPath)
                    .resize(1366, maxHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
                    .png()
                    .toBuffer(),
                left: 1366 + 20, 
                top: 0 
            }
        ])
        .png()
        .toFile(sideBySidePath);
        
        console.log(`Overlay comparison saved to: ${overlayPath}`);
        console.log(`Side-by-side comparison saved to: ${sideBySidePath}`);
        
    } catch (error) {
        console.error('Error creating comparison:', error);
        throw error;
    }
}

compare1366().then(() => {
    console.log('1366px comparison completed!');
}).catch(error => {
    console.error('Comparison failed:', error);
});