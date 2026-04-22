const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const optimizedFiles = [
  'NFC2.optimized.webp',
  'judyprasad.optimized.webp',
  'RFID.optimized.webp',
  'irudayacharles.optimized.webp',
];

console.log('=== Replacing Original Images with Optimized Versions ===\n');

let replaced = 0;
let skipped = 0;

for (const optimizedFile of optimizedFiles) {
  const optimizedPath = path.join(publicDir, optimizedFile);
  const originalName = optimizedFile.replace('.optimized', '');
  const originalPath = path.join(publicDir, originalName);
  
  if (!fs.existsSync(optimizedPath)) {
    console.log(`⚠ ${optimizedFile}: Optimized file not found, skipping`);
    skipped++;
    continue;
  }
  
  try {
    // Check if original exists and get its size
    if (fs.existsSync(originalPath)) {
      const originalStats = fs.statSync(originalPath);
      const optimizedStats = fs.statSync(optimizedPath);
      const originalKB = Math.round(originalStats.size / 1024);
      const optimizedKB = Math.round(optimizedStats.size / 1024);
      
      console.log(`Processing ${originalName}...`);
      console.log(`  Original: ${originalKB} KB`);
      console.log(`  Optimized: ${optimizedKB} KB`);
      
      // Try to delete original
      try {
        fs.unlinkSync(originalPath);
        // Rename optimized to original
        fs.renameSync(optimizedPath, originalPath);
        console.log(`  ✓ Replaced successfully\n`);
        replaced++;
      } catch (err) {
        console.log(`  ⚠ Could not replace: ${err.message}`);
        console.log(`  → Please manually replace ${originalName} with ${optimizedFile}\n`);
        skipped++;
      }
    } else {
      // Original doesn't exist, just rename optimized
      fs.renameSync(optimizedPath, originalPath);
      console.log(`✓ Created ${originalName} from optimized version\n`);
      replaced++;
    }
  } catch (error) {
    console.log(`✗ Error processing ${originalName}: ${error.message}\n`);
    skipped++;
  }
}

console.log('=== Summary ===');
console.log(`✓ Replaced: ${replaced} files`);
if (skipped > 0) {
  console.log(`⚠ Skipped: ${skipped} files (may need manual replacement)`);
}

