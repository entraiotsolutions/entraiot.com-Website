const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const sizeThreshold = 100 * 1024; // 100KB

// Images to optimize
const imagesToProcess = [
  'CEO.jpeg',
  'christyraj.png',
  'irudayacharles.png',
  'judyprasad.png',
  'logo.png',
  'logobg.png',
  'mohanprasad.png',
  'NFC.png',
  'NFC2.png',
  'RFID.png',
  'RFID2.png',
  'favicon-512x512.png'
];

async function optimizeImage(inputPath, outputPath, format) {
  try {
    const inputBuffer = fs.readFileSync(inputPath);
    const originalSize = inputBuffer.length;

    let sharpInstance = sharp(inputPath);

    // Get image metadata
    const metadata = await sharpInstance.metadata();

    if (format === 'webp') {
      // Convert PNG to WebP with quality 85 for photos, 90 for graphics
      const isPhoto = metadata.channels === 3; // RGB images are typically photos
      const quality = isPhoto ? 85 : 90;

      sharpInstance = sharpInstance.webp({ quality, effort: 6 });
    } else if (format === 'jpeg') {
      // Recompress JPEG with quality 85
      sharpInstance = sharpInstance.jpeg({ quality: 85, mozjpeg: true });
    }

    const outputBuffer = await sharpInstance.toBuffer();
    const newSize = outputBuffer.length;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    fs.writeFileSync(outputPath, outputBuffer);

    return {
      success: true,
      originalSize,
      newSize,
      reduction
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function processImages() {
  console.log('Starting image optimization...\n');

  const results = [];

  for (const imageName of imagesToProcess) {
    const inputPath = path.join(publicDir, imageName);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠ Skipping ${imageName}: File not found`);
      continue;
    }

    const stats = fs.statSync(inputPath);
    if (stats.size <= sizeThreshold) {
      console.log(`✓ ${imageName}: Already under 100KB (${Math.round(stats.size / 1024)} KB)`);
      continue;
    }

    const ext = path.extname(imageName).toLowerCase();
    let outputFormat = null;
    let outputPath = null;

    if (ext === '.png') {
      // Convert PNG to WebP
      outputFormat = 'webp';
      outputPath = path.join(publicDir, imageName.replace(/\.png$/i, '.webp'));
    } else if (ext === '.jpeg' || ext === '.jpg') {
      // Recompress JPEG
      outputFormat = 'jpeg';
      outputPath = path.join(publicDir, imageName.replace(/\.jpeg$/i, '.jpg'));
    }

    if (!outputFormat) {
      console.log(`⚠ Skipping ${imageName}: Unsupported format`);
      continue;
    }

    console.log(`Processing ${imageName}...`);
    const result = await optimizeImage(inputPath, outputPath, outputFormat);

    if (result.success) {
      const originalKB = Math.round(result.originalSize / 1024);
      const newKB = Math.round(result.newSize / 1024);
      console.log(`  ✓ Optimized: ${originalKB} KB → ${newKB} KB (${result.reduction}% reduction)`);

      results.push({
        original: imageName,
        optimized: path.basename(outputPath),
        originalSize: result.originalSize,
        newSize: result.newSize,
        reduction: result.reduction,
        format: outputFormat
      });
    } else {
      console.log(`  ✗ Error: ${result.error}`);
    }
  }

  console.log('\n=== Optimization Summary ===');
  if (results.length === 0) {
    console.log('No images were optimized.');
  } else {
    let totalOriginal = 0;
    let totalNew = 0;

    results.forEach(r => {
      totalOriginal += r.originalSize;
      totalNew += r.newSize;
      console.log(`${r.original} → ${r.optimized} (${r.reduction}% reduction)`);
    });

    const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
    const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(2);
    const totalNewMB = (totalNew / 1024 / 1024).toFixed(2);

    console.log(`\nTotal: ${totalOriginalMB} MB → ${totalNewMB} MB (${totalReduction}% reduction)`);
    console.log('\n⚠ Note: Update image references in codebase to use new filenames.');
  }
}

processImages().catch(console.error);

