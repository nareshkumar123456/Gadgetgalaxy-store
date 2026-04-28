import fs from 'fs';
import gis from 'g-i-s';

const file = 'src/data/products.js';
let content = fs.readFileSync(file, 'utf8');

function getImageUrl(query) {
  return new Promise((resolve, reject) => {
    gis(query + ' product white background', (error, results) => {
      if (error) {
        resolve(null);
      } else {
        if (results && results.length > 0) {
          resolve(results[0].url);
        } else {
          resolve(null);
        }
      }
    });
  });
}

// Ensure g-i-s requests happen sequentially with delay to avoid rate limiting
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  const lines = content.split('\n');
  const modifiedLines = [];
  
  for (let line of lines) {
    if (line.includes('img:')) {
      const nameMatch = line.match(/name:\s*'([^']+)'/);
      if (nameMatch) {
        const name = nameMatch[1];
        console.log(`Fetching image for ${name}...`);
        const imgUrl = await getImageUrl(name);
        
        if (imgUrl) {
          console.log(`Found: ${imgUrl}`);
          line = line.replace(/img:\s*'[^']+'/, `img:'${imgUrl}'`);
        } else {
          console.log(`Failed to find image for ${name}`);
        }
        await delay(500); // 500ms delay between requests
      }
    }
    modifiedLines.push(line);
  }
  
  fs.writeFileSync(file, modifiedLines.join('\n'), 'utf8');
  console.log('Done replacing images!');
}

run();
