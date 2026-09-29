const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const videoFile = path.join(__dirname, 'src/assets/water-bg.mp4');
const posterFile = path.join(__dirname, 'src/assets/water-poster.jpg');
const liteVideoFile = path.join(__dirname, 'src/assets/water-bg-lite.mp4');

try {
  if (fs.existsSync(videoFile)) {
    console.log('Extracting poster...');
    execSync(`"${ffmpegPath}" -y -i "${videoFile}" -vframes 1 -q:v 2 "${posterFile}"`);
    console.log('Successfully created poster');

    console.log('Optimizing video...');
    // Reduce resolution to 720p, lower bitrate
    execSync(`"${ffmpegPath}" -y -i "${videoFile}" -vf scale=-2:720 -c:v libx264 -crf 28 -preset fast -an "${liteVideoFile}"`);
    console.log('Successfully optimized video');
  }
} catch (e) {
  console.error('Failed video processing', e.message);
}
