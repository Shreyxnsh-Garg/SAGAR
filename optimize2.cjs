const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'hero-graphic.png',
  'maritime-enforcement-gap.png',
  'sagar-logo.png',
  'step-detect.png',
  'step-identify.png',
  'step-monitor.png',
  'step-report.png'
];

async function optimizeImages() {
  for (const img of images) {
    const file = path.join(__dirname, 'src/assets', img);
    if (!fs.existsSync(file)) continue;
    
    const out = file.replace('.png', '.webp');
    console.log(`Optimizing ${file} to ${out}...`);
    try {
      await sharp(file)
        .webp({ quality: 80, effort: 6 })
        .toFile(out);
      console.log(`Successfully optimized ${img}`);
    } catch (e) {
      console.error(`Failed to optimize ${file}`, e.message);
    }
  }
}

optimizeImages();
