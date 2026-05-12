const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const sizeThreshold = 100 * 1024; // 100KB

// Large images that need optimization
const largeImages = [
  { name: 'NFC2.webp', maxWidth: 1150, quality: 65 },
  { name: 'judyprasad.webp', maxWidth: 800, quality: 85 },
  { name: 'RFID.webp', maxWidth: 1600, quality: 75 },
  { name: 'CEO.jpg', maxWidth: 800, quality: 85 },
  { name: 'irudayacharles.webp', maxWidth: 800, quality: 85 },
];

async function optimizeImage(imageConfig) {
  const { name, maxWidth, quality } = imageConfig;
  const inputPath = path.join(publicDir, name);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠ Skipping ${name}: File not found`);
    return null;
  }
  
  const stats = fs.statSync(inputPath);
  const originalSize = stats.size;
  
  if (originalSize <= sizeThreshold) {
    console.log(`✓ ${name}: Already under 100KB (${Math.round(originalSize / 1024)} KB)`);
    return null;
  }
  
  try {
    console.log(`\nProcessing ${name} (${Math.round(originalSize / 1024)} KB)...`);
    
    const metadata = await sharp(inputPath).metadata();
    const ext = path.extname(name).toLowerCase();
    
    // Resize if image is larger than maxWidth
    let sharpInstance = sharp(inputPath);
    if (metadata.width > maxWidth) {
      sharpInstance = sharpInstance.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
      console.log(`  Resizing from ${metadata.width}x${metadata.height} to max ${maxWidth}px width`);
    }
    
    // Optimize based on format
    if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({ 
        quality, 
        effort: 6,
        method: 6 // Best compression
      });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ 
        quality, 
        mozjpeg: true,
        progressive: true
      });
    }
    
    // Create backup
    const backupPath = inputPath + '.backup';
    if (!fs.existsSync(backupPath)) {
      try {
        fs.copyFileSync(inputPath, backupPath);
        console.log(`  Created backup: ${path.basename(backupPath)}`);
      } catch (err) {
        console.log(`  ⚠ Could not create backup: ${err.message}`);
      }
    }
    
    // Optimize and save to optimized file first (with .optimized extension)
    const optimizedPath = inputPath.replace(/\.(webp|jpg|jpeg)$/i, '.optimized.$1');
    const outputBuffer = await sharpInstance.toBuffer();
    fs.writeFileSync(optimizedPath, outputBuffer);
    console.log(`  Created optimized version: ${path.basename(optimizedPath)}`);
    
    // Try to replace original, but don't fail if locked
    try {
      // On Windows, we need to remove the original first
      if (fs.existsSync(inputPath)) {
        fs.chmodSync(inputPath, 0o666); // Make writable
        fs.unlinkSync(inputPath);
      }
      fs.renameSync(optimizedPath, inputPath);
      console.log(`  ✓ Replaced original with optimized version`);
    } catch (err) {
      console.log(`  ⚠ Could not replace original file (${err.message})`);
      console.log(`  → Optimized file saved as: ${path.basename(optimizedPath)}`);
      console.log(`  → Please manually replace ${path.basename(inputPath)} with ${path.basename(optimizedPath)}`);
      // Don't return error, just note that manual replacement is needed
    }
    
    const newSize = outputBuffer.length;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    const originalKB = Math.round(originalSize / 1024);
    const newKB = Math.round(newSize / 1024);
    
    console.log(`  ✓ Optimized: ${originalKB} KB → ${newKB} KB (${reduction}% reduction)`);
    
    // Remove backup if optimization was successful and file is now under threshold
    if (newSize <= sizeThreshold) {
      fs.unlinkSync(backupPath);
      console.log(`  ✓ File is now under 100KB threshold`);
    }
    
    return {
      name,
      originalSize,
      newSize,
      reduction,
      success: true
    };
  } catch (error) {
    console.log(`  ✗ Error optimizing ${name}: ${error.message}`);
    return {
      name,
      success: false,
      error: error.message
    };
  }
}

async function processAllImages() {
  console.log('=== Image Optimization Script ===\n');
  console.log('Optimizing images over 100KB...\n');
  
  const results = [];
  
  for (const imageConfig of largeImages) {
    const result = await optimizeImage(imageConfig);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n=== Optimization Summary ===');
  if (results.length === 0) {
    console.log('No images needed optimization.');
  } else {
    let totalOriginal = 0;
    let totalNew = 0;
    
    results.forEach(r => {
      if (r.success) {
        totalOriginal += r.originalSize;
        totalNew += r.newSize;
        const originalKB = Math.round(r.originalSize / 1024);
        const newKB = Math.round(r.newSize / 1024);
        console.log(`${r.name}: ${originalKB} KB → ${newKB} KB (${r.reduction}% reduction)`);
      }
    });
    
    if (totalOriginal > 0) {
      const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
      const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
      const totalNewMB = (totalNew / 1024 / 1024).toFixed(2);
      
      console.log(`\nTotal: ${totalOriginalMB} MB → ${totalNewMB} MB (${totalReduction}% reduction)`);
    }
  }
  
  console.log('\n✓ Optimization complete!');
  console.log('Note: Backup files (.backup) have been created. You can delete them after verifying the optimized images.');
}

processAllImages().catch(console.error);

