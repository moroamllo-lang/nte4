const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

const inputPath = path.join(__dirname, 'NTE_video.mp4');
const outputPath = path.join(__dirname, 'promo_video.mp4');

// Cut from 00:00:16 to 00:00:23 (exactly 7 seconds)
const command = `"${ffmpegPath}" -ss 00:00:16 -i "${inputPath}" -t 7 -c:v libx264 -c:a aac -y "${outputPath}"`;

console.log("Initializing promo video extraction...");
console.log(`Using static ffmpeg from: ${ffmpegPath}`);
console.log(`Extracting 16s-23s from ${inputPath} -> ${outputPath}...`);

exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error("FAIL: Error extracting promo video:", err);
        process.exit(1);
    }
    console.log("SUCCESS: Promo video extracted successfully (7 seconds, 16s to 23s)!");
    console.log(stdout);
    console.error(stderr);
});
