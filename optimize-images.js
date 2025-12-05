const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeImages() {
  const inputDir = 'src/assets';
  const outputDir = 'src/assets-optimized';

  console.log('🖼️  Starting image optimization...\n');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(inputDir);
    let processed = 0;
    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const stats = fs.statSync(inputPath);
      
      if (!stats.isFile()) continue;

      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      const originalSize = stats.size;

      try {
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          const outputPath = path.join(outputDir, file);
          
          await sharp(inputPath)
            .resize(2000, 2000, { // Max 2000px width/height
              fit: 'inside',
              withoutEnlargement: true
            })
            .jpeg({ quality: 80, progressive: true })
            .toFile(outputPath);

          const optimizedSize = fs.statSync(outputPath).size;
          const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
          
          console.log(`✅ ${file}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% smaller)`);
          
          totalOriginal += originalSize;
          totalOptimized += optimizedSize;
          processed++;

        } else if (ext === '.gif' || ext === '.GIF') {
          // For GIFs, just copy them (converting would lose animation)
          fs.copyFileSync(inputPath, path.join(outputDir, file));
          console.log(`📋 ${file}: Copied (GIF animations preserved)`);
        } else if (ext === '.mov') {
          console.log(`⚠️  ${file}: Video file - compress manually using ffmpeg or HandBrake`);
        }
      } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
      }
    }

    const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    console.log(`\n📊 Optimization Summary:`);
    console.log(`Files processed: ${processed}`);
    console.log(`Original size:   ${formatBytes(totalOriginal)}`);
    console.log(`Optimized size:  ${formatBytes(totalOptimized)}`);
    console.log(`Total savings:   ${formatBytes(totalOriginal - totalOptimized)} (${totalSavings}%)\n`);

    console.log('✨ Done! Optimized images are in "src/assets-optimized"');
    console.log('\n📝 Next steps:');
    console.log('   1. Review optimized images for quality');
    console.log('   2. Replace files in src/assets: mv src/assets-optimized/* src/assets/');
    console.log('   3. For videos (.mov), use: ffmpeg -i input.mov -vcodec h264 -crf 23 output.mp4\n');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

optimizeImages();
