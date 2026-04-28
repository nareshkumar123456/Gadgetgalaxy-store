import fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

const file = 'src/data/products.js';
let content = fs.readFileSync(file, 'utf8');

async function getImageUrl(query) {
  try {
    const url = `https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query + ' product')}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const imgUrl = $('#sres li img').first().attr('data-src') || $('#sres li img').first().attr('src');
    return imgUrl;
  } catch (error) {
    console.error(`Error fetching for ${query}:`, error.message);
    return null;
  }
}

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
          line = line.replace(/img:\s*'[^']+'/, `img:'${imgUrl}'`);
        } else {
          console.log(`Failed to find image for ${name}, keeping original`);
        }
      }
    }
    modifiedLines.push(line);
  }
  
  fs.writeFileSync(file, modifiedLines.join('\n'), 'utf8');
  console.log('Done replacing images!');
}

run();
