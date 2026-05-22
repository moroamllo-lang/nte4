const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');

const inputPath = path.join(__dirname, 'NTE_video.mp4');
const outputPath = path.join(__dirname, 'NTE_video_trimmed.mp4');

// Cut to exactly 5 seconds, using libx264 for compression and compatibility
const command = `"${ffmpegPath}" -ss 00:00:00 -i "${inputPath}" -t 5 -c:v libx264 -c:a aac -y "${outputPath}"`;

console.log("Initializing video trimming...");
console.log(`Using static ffmpeg from: ${ffmpegPath}`);
console.log(`Trimming ${inputPath} -> ${outputPath}...`);

exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error("FAIL: Error trimming video:", err);
        process.exit(1);
    }
    console.log("SUCCESS: Video trimmed successfully to exactly 5 seconds!");
    console.log(stdout);
    console.error(stderr);
});
