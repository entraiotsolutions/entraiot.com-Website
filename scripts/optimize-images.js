const fs = require('fs');
const path = require('path');

// Image extensions to check
const imageExtensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'];
const publicDir = path.join(__dirname, '..', 'public');
const sizeThreshold = 100 * 1024; // 100KB in bytes

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function scanDirectory(dir) {
  const results = [];
  
  function scan(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scan(filePath);
      } else {
        const ext = path.extname(file);
        if (imageExtensions.includes(ext)) {
          const sizeKB = getFileSizeInKB(filePath);
          if (stat.size > sizeThreshold) {
            results.push({
              path: filePath,
              name: file,
              size: stat.size,
              sizeKB: sizeKB,
              extension: ext.toLowerCase()
            });
          }
        }
      }
    });
  }
  
  scan(dir);
  return results;
}

console.log('Scanning for images larger than 100KB...\n');
const largeImages = scanDirectory(publicDir);

if (largeImages.length === 0) {
  console.log('✓ No images found larger than 100KB');
} else {
  console.log(`Found ${largeImages.length} image(s) larger than 100KB:\n`);
  largeImages.forEach(img => {
    console.log(`${img.name}: ${img.sizeKB} KB (${img.size} bytes)`);
    console.log(`  Path: ${img.path}`);
    console.log(`  Extension: ${img.extension}`);
    if (img.extension === '.png') {
      console.log(`  Recommendation: Convert to WebP for ~70-80% size reduction`);
    } else if (img.extension === '.jpg' || img.extension === '.jpeg') {
      console.log(`  Recommendation: Recompress JPEG with quality 80-85%`);
    }
    console.log('');
  });
  
  console.log('\nRecommendations:');
  console.log('1. Install sharp: npm install --save-dev sharp');
  console.log('2. Run: node scripts/compress-images.js');
  console.log('3. This will create optimized WebP/JPEG versions');
}

