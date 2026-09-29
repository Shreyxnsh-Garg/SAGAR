const { execSync } = require('child_process');

const images = [
  'hero-graphic.png',
  'maritime-enforcement-gap.png',
  'sagar-logo.png',
  'step-detect.png',
  'step-identify.png',
  'step-monitor.png',
  'step-report.png'
];

for (const img of images) {
  const file = `src/assets/${img}`;
  const out = file.replace('.png', '.webp');
  console.log(`Optimizing ${file} to ${out}...`);
  try {
    // webp, quality 80
    execSync(`npx -y sharp-cli -i ${file} -o ${out} webp -q 80`);
  } catch (e) {
    console.error(`Failed to optimize ${file}`, e.message);
  }
}
console.log('Done images.');
