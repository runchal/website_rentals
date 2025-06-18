const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');

async function createOverlay() {
  console.log('Creating wireframe overlay comparison...');
  
  const wireframePath = path.join(__dirname, 'homepage_wireframe.png');
  const currentPath = path.join(__dirname, 'homepage_current.png');
  const outputPath = path.join(__dirname, 'homepage_overlay.png');
  
  try {
    // Read both images
    const wireframe = await sharp(wireframePath);
    const current = await sharp(currentPath);
    
    // Get metadata to ensure same size
    const wireframeMeta = await wireframe.metadata();
    const currentMeta = await current.metadata();
    
    console.log(`Wireframe size: ${wireframeMeta.width}x${wireframeMeta.height}`);
    console.log(`Current size: ${currentMeta.width}x${currentMeta.height}`);
    
    // Tint the wireframe with a blue color and make it semi-transparent
    const tintedWireframe = await sharp(wireframePath)
      .resize(currentMeta.width, currentMeta.height, { fit: 'fill' })
      .tint({ r: 0, g: 100, b: 255 }) // Blue tint
      .png()
      .toBuffer();
    
    // Make current screenshot semi-transparent
    const semiTransparentCurrent = await sharp(currentPath)
      .ensureAlpha()
      .png()
      .toBuffer();
    
    // Composite the images - wireframe on top at 50% opacity
    await sharp(semiTransparentCurrent)
      .composite([
        {
          input: tintedWireframe,
          blend: 'over',
          opacity: 0.5
        }
      ])
      .toFile(outputPath);
    
    console.log(`Overlay saved to: ${outputPath}`);
    
    // Also create a side-by-side comparison
    const sideBySidePath = path.join(__dirname, 'homepage_side_by_side.png');
    
    // Resize both to same height for side-by-side
    const targetHeight = 1500;
    
    const wireframeResized = await sharp(wireframePath)
      .resize(null, targetHeight, { fit: 'inside' })
      .png()
      .toBuffer();
      
    const currentResized = await sharp(currentPath)
      .resize(null, targetHeight, { fit: 'inside' })
      .png()
      .toBuffer();
    
    const wireframeResizedMeta = await sharp(wireframeResized).metadata();
    const currentResizedMeta = await sharp(currentResized).metadata();
    
    // Create side by side
    await sharp({
      create: {
        width: wireframeResizedMeta.width + currentResizedMeta.width + 20,
        height: targetHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      { input: wireframeResized, left: 0, top: 0 },
      { input: currentResized, left: wireframeResizedMeta.width + 20, top: 0 }
    ])
    .toFile(sideBySidePath);
    
    console.log(`Side-by-side comparison saved to: ${sideBySidePath}`);
    
  } catch (error) {
    console.error('Error creating overlay:', error);
  }
}

createOverlay();