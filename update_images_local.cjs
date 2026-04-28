const fs = require('fs');

const file = 'src/data/products.js';
let content = fs.readFileSync(file, 'utf8');

const images = {
  Mobile: '/assets/mobile.png',
  Laptop: '/assets/laptop.png',
  Camera: '/assets/camera.png',
  Audio: '/assets/audio.png',
  Wearable: '/assets/wearable.png',
  Gaming: '/assets/gaming.png',
  Accessories: '/assets/accessory.png'
};

const lines = content.split('\n');
const modifiedLines = lines.map(line => {
  if (line.includes('img:')) {
    const catMatch = line.match(/cat:\s*'([^']+)'/);
    
    if (catMatch) {
      const cat = catMatch[1];
      const imgUrl = images[cat] || '/assets/mobile.png';
      return line.replace(/img:\s*'[^']+'/, `img:'${imgUrl}'`);
    }
  }
  return line;
});

fs.writeFileSync(file, modifiedLines.join('\n'), 'utf8');
console.log('Images updated to use generated local assets!');
