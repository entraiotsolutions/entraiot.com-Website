const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, '..', 'public');
const srcDir = path.join(__dirname, '..', 'src');

// Get all image files
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG', '.WEBP'];
const imageFiles = fs.readdirSync(publicDir)
  .filter(file => {
    const ext = path.extname(file);
    return imageExtensions.includes(ext) && fs.statSync(path.join(publicDir, file)).isFile();
  });

// Get all source files
function getAllSourceFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (!['node_modules', '.next', '.git', 'out'].includes(file)) {
        getAllSourceFiles(filePath, fileList);
      }
    } else {
      // Only check code files
      if (['.ts', '.tsx', '.js', '.jsx', '.json', '.css'].includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

const sourceFiles = getAllSourceFiles(srcDir);
const publicManifest = path.join(publicDir, 'manifest.json');
if (fs.existsSync(publicManifest)) {
  sourceFiles.push(publicManifest);
}

console.log('Checking for unused images...\n');
console.log(`Found ${imageFiles.length} image(s) in public folder\n`);

const unusedImages = [];
const usedImages = [];

imageFiles.forEach(imageFile => {
  const imageName = imageFile;
  const imageNameWithoutExt = path.parse(imageName).name;
  const imageExt = path.parse(imageName).ext;
  
  // Search for references in source files
  let found = false;
  
  for (const sourceFile of sourceFiles) {
    try {
      const content = fs.readFileSync(sourceFile, 'utf8');
      
      // Check for exact filename matches
      if (content.includes(imageName) || 
          content.includes(`/${imageName}`) ||
          content.includes(`"${imageName}"`) ||
          content.includes(`'${imageName}'`) ||
          content.includes(imageName)) {
        found = true;
        break;
      }
      
      // Also check for references without extension (for WebP/PNG conversions)
      if (imageExt === '.webp') {
        // Check if original PNG/JPEG name is still referenced
        const originalPng = imageName.replace('.webp', '.png');
        const originalJpg = imageName.replace('.webp', '.jpg');
        const originalJpeg = imageName.replace('.webp', '.jpeg');
        
        if (content.includes(originalPng) || 
            content.includes(originalJpg) || 
            content.includes(originalJpeg)) {
          // This WebP has an original that's still referenced, so it might be unused if original exists
          const originalPath = path.join(publicDir, originalPng) || 
                               path.join(publicDir, originalJpg) || 
                               path.join(publicDir, originalJpeg);
          if (!fs.existsSync(originalPath)) {
            found = true;
            break;
          }
        }
      }
    } catch (error) {
      // Skip files that can't be read
    }
  }
  
  if (found) {
    usedImages.push(imageFile);
  } else {
    unusedImages.push(imageFile);
  }
});

console.log('=== USED IMAGES ===');
if (usedImages.length === 0) {
  console.log('None found');
} else {
  usedImages.forEach(img => {
    const stats = fs.statSync(path.join(publicDir, img));
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`  ✓ ${img} (${sizeKB} KB)`);
  });
}

console.log('\n=== UNUSED IMAGES ===');
if (unusedImages.length === 0) {
  console.log('None - All images are being used!');
} else {
  unusedImages.forEach(img => {
    const stats = fs.statSync(path.join(publicDir, img));
    const sizeKB = Math.round(stats.size / 1024);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ⚠ ${img} (${sizeKB} KB / ${sizeMB} MB)`);
  });
  
  const totalUnusedSize = unusedImages.reduce((sum, img) => {
    return sum + fs.statSync(path.join(publicDir, img)).size;
  }, 0);
  const totalUnusedMB = (totalUnusedSize / 1024 / 1024).toFixed(2);
  
  console.log(`\nTotal unused: ${unusedImages.length} image(s), ${totalUnusedMB} MB`);
  console.log('\nNote: Original PNG/JPEG files may be kept as fallbacks.');
  console.log('      WebP versions are now the primary format in use.');
}

