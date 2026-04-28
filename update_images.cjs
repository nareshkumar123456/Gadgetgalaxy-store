const fs = require('fs');

const file = 'src/data/products.js';
let content = fs.readFileSync(file, 'utf8');

const images = {
  Mobile: {
    Apple: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop',
    Samsung: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
    default: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop'
  },
  Laptop: {
    Apple: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    default: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop'
  },
  Camera: {
    Sony: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
    Canon: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop',
    default: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600&h=600&fit=crop'
  },
  Audio: {
    default: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'
  },
  Wearable: {
    default: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop'
  },
  Gaming: {
    default: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=600&h=600&fit=crop'
  },
  Accessories: {
    Keyboard: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=600&h=600&fit=crop',
    Mouse: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop',
    default: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop'
  }
};

const lines = content.split('\n');
const modifiedLines = lines.map(line => {
  if (line.includes('img:')) {
    const catMatch = line.match(/cat:\s*'([^']+)'/);
    const brandMatch = line.match(/brand:\s*'([^']+)'/);
    const nameMatch = line.match(/name:\s*'([^']+)'/);
    
    if (catMatch && brandMatch && nameMatch) {
      const cat = catMatch[1];
      const brand = brandMatch[1];
      const name = nameMatch[1];
      
      let imgUrl = '';
      if (cat === 'Accessories') {
        if (name.toLowerCase().includes('keyboard')) {
           imgUrl = images.Accessories.Keyboard;
        } else if (name.toLowerCase().includes('mouse')) {
           imgUrl = images.Accessories.Mouse;
        } else {
           imgUrl = images.Accessories.default;
        }
      } else if (images[cat]) {
        if (images[cat][brand]) {
          imgUrl = images[cat][brand];
        } else {
          imgUrl = images[cat].default;
        }
      } else {
        imgUrl = images.Mobile.default;
      }
      
      return line.replace(/img:\s*'[^']+'/, `img:'${imgUrl}'`);
    }
  }
  return line;
});

fs.writeFileSync(file, modifiedLines.join('\n'), 'utf8');
console.log('Images updated successfully!');
