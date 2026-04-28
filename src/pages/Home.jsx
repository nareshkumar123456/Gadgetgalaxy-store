import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export default function Home() {
  const { wishlist, compareList, addToCart, toggleWish, toggleCompare, catalog } = useStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [search, setSearch] = useState('');
  const [sortSelect, setSortSelect] = useState('default');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle Search from Header
  useEffect(() => {
    const handleSearch = (e) => setSearch(e.detail.toLowerCase());
    window.addEventListener('searchUpdate', handleSearch);
    return () => window.removeEventListener('searchUpdate', handleSearch);
  }, []);

  // Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Filtering & Sorting
  let list = catalog.filter(p => {
    const matchCat = activeCategory === 'All' || p.cat === activeCategory;
    const matchBrand = activeBrand === 'All' || p.brand === activeBrand;
    const matchQ = p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search) || p.cat.toLowerCase().includes(search);
    return matchCat && matchBrand && matchQ;
  });

  const disc = (p) => Math.round((1 - p.price / p.old) * 100);

  if (sortSelect === 'priceLow') list.sort((a, b) => a.price - b.price);
  if (sortSelect === 'priceHigh') list.sort((a, b) => b.price - a.price);
  if (sortSelect === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (sortSelect === 'discount') list.sort((a, b) => disc(b) - disc(a));

  const brands = ['All', 'Apple', 'Samsung', 'Bose', 'JBL', 'Sennheiser', 'Beats', 'Bang & Olufsen', 'Skullcandy', 'Audio-Technica', 'Anker', 'OnePlus', 'Xiaomi', 'Microsoft', 'Huawei', 'Google', 'Vivo', 'OPPO', 'Realme', 'Motorola', 'Nokia', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Razer', 'Sony', 'Canon', 'Nikon', 'Fujifilm', 'Panasonic', 'Olympus', 'Leica', 'Kodak', 'Hasselblad', 'Pentax', 'GoPro', 'DJI', 'Nintendo', 'Logitech', 'Corsair', 'SteelSeries', 'HyperX'];
  const categories = [
    { name: 'All', icon: '🏷' }, { name: 'Mobile', icon: '📱' }, { name: 'Laptop', icon: '💻' },
    { name: 'Camera', icon: '📷' }, { name: 'Audio', icon: '🎧' }, { name: 'Wearable', icon: '⌚' },
    { name: 'Accessories', icon: '🖱' }, { name: 'Gaming', icon: '🎮' }
  ];

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&q=80",
      tagClass: "tag-hot", tagText: "🔥 Best Seller",
      title: "MacBook Pro", subtitle: "14\" M3 Max",
      desc: "The most powerful laptop ever. Built for creators, engineers & visionaries.",
      price: "₹1,89,900", old: "₹2,10,000", off: "-10% OFF", id: 30
    },
    {
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1400&q=80",
      tagClass: "tag-new", tagText: "✨ New Launch",
      title: "iPhone 15 Pro", subtitle: "Titanium",
      desc: "A18 Pro chip. 5x Optical Zoom. Action Button. The ultimate smartphone.",
      price: "₹1,34,900", old: "₹1,49,900", off: "-10% OFF", id: 1
    },
    {
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=80",
      tagClass: "tag-sale", tagText: "🏷 Big Sale",
      title: "Sony WH-1000XM5", subtitle: "Headphones",
      desc: "Industry-leading noise cancellation. 30-hour battery. Pure sonic bliss.",
      price: "₹24,990", old: "₹34,990", off: "-29% OFF", id: 83
    },
    {
      img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=1400&q=80",
      tagClass: "tag-new", tagText: "⌚ New",
      title: "Apple Watch", subtitle: "Ultra 2",
      desc: "Adventure-grade design. Dual-frequency GPS. 60 hours of battery life.",
      price: "₹89,900", old: "₹95,000", off: "-6% OFF", id: 94
    }
  ];

  return (
    <>
      <div className="hero-banner">
        <div className="hero-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((s, i) => (
            <div className={`hslide ${i === currentSlide ? 'active' : ''}`} key={i}>
              <img src={s.img} alt={s.title} />
              <div className="hslide-overlay"></div>
              <div className="hslide-content">
                <div className={`hslide-tag ${s.tagClass}`}>{s.tagText}</div>
                <div className="hslide-title">{s.title}<br />{s.subtitle}</div>
                <div className="hslide-sub">{s.desc}</div>
                <div className="hslide-price">
                  <span className="hp-now">{s.price}</span>
                  <span className="hp-old">{s.old}</span>
                  <span className="hp-off">{s.off}</span>
                </div>
                <button className="hslide-btn" onClick={() => addToCart(s.id)}>Add to Cart →</button>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-thumb-strip">
          {slides.map((s, i) => (
            <div className={`hthumbs ${i === currentSlide ? 'active' : ''}`} key={i} onClick={() => setCurrentSlide(i)}>
              <img src={s.img.replace('w=1400', 'w=150')} alt="" />
            </div>
          ))}
        </div>

        <div className="hero-dots">
          {slides.map((_, i) => (
            <div className={`hdot ${i === currentSlide ? 'active' : ''}`} key={i} onClick={() => setCurrentSlide(i)}></div>
          ))}
        </div>
      </div>

      <div className="promo-strip">
        <div className="promo-item"><span>🚚</span><strong>Free Delivery</strong> on orders above ₹999</div>
        <div className="promo-item"><span>🔄</span><strong>Easy Returns</strong> within 30 days</div>
        <div className="promo-item"><span>🛡️</span><strong>1-Year Warranty</strong> on all products</div>
        <div className="promo-item"><span>⚡</span><strong>Same Day</strong> dispatch before 2 PM</div>
      </div>

      <div className="cats-section">
        <h2>Browse by Category</h2>
        <div className="cats-wrap">
          {categories.map(c => (
            <div 
              key={c.name} 
              className={`cat-chip ${activeCategory === c.name ? 'active' : ''}`} 
              onClick={() => { setActiveCategory(c.name); setActiveBrand('All'); }}
            >
              <span className="chip-icon">{c.icon}</span> {c.name}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '14px' }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '10px' }}>Filter by Brand</div>
          <div className="cats-wrap">
            {brands.map(b => (
              <div 
                key={b} 
                className={`cat-chip b-chip ${activeBrand === b ? 'active' : ''}`} 
                onClick={() => setActiveBrand(b)}
              >
                {b === 'Apple' ? '🍎 ' : ''}{b}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-left">
          <span className="filter-label">Showing</span>
          <span className="filter-count">{list.length}</span>
          <span className="filter-label">products</span>
        </div>
        <select className="sort-sel" value={sortSelect} onChange={(e) => setSortSelect(e.target.value)}>
          <option value="default">✨ Featured</option>
          <option value="priceLow">💰 Price: Low → High</option>
          <option value="priceHigh">💎 Price: High → Low</option>
          <option value="rating">⭐ Top Rated</option>
          <option value="discount">🔥 Biggest Discount</option>
        </select>
      </div>

      <div className="products-section">
        <div className="section-header">
          <div className="section-title">All <span>Products</span></div>
        </div>
        <div className="product-grid">
          {list.length === 0 ? (
            <div className="no-results"><span className="nr-icon">🔍</span><p>No products found</p></div>
          ) : (
            list.map((p, i) => {
              const d = disc(p);
              const liked = wishlist.includes(p.id);
              const compared = compareList.includes(p.id);
              return (
                <div className="card" style={{ animationDelay: `${(i % 10) * 0.04}s` }} key={p.id}>
                  <div className="card-img">
                    <img src={p.img} alt={p.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23111827%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23fff%22 font-size=%2224%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage%20unavailable%3C/text%3E%3C/svg%3E"; }} />
                    <div className="cbadge-wrap">
                      <span className={`cbadge-pill cp-${p.badge}`}>
                        {p.badge === 'sale' ? 'SALE' : p.badge === 'new' ? 'NEW' : '🔥 HOT'}
                      </span>
                      <span className="cbadge-pill cp-off">-{d}%</span>
                    </div>
                    <button className={`wish-btn ${liked ? 'liked' : ''}`} onClick={() => toggleWish(p.id)}>
                      {liked ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-cat">{p.brand} · {p.cat}</div>
                    <div className="card-name">{p.name}</div>
                    <div className="card-stars">
                      <span className="stars-icons">
                        {'★'.repeat(Math.floor(p.rating))}{p.rating % 1 >= .5 ? '½' : ''}{'☆'.repeat(5 - Math.ceil(p.rating))}
                      </span>
                      <span className="stars-count">{p.rating} ({p.reviews.toLocaleString()})</span>
                    </div>
                    <div className="card-price">
                      <span className="cp-now">₹{p.price.toLocaleString()}</span>
                      <span className="cp-old">₹{p.old.toLocaleString()}</span>
                    </div>
                    <div className="card-actions">
                      <button className="btn-cart" onClick={() => addToCart(p.id)}>🛒 Add to Cart</button>
                      <button className={`btn-compare ${compared ? 'active' : ''}`} onClick={() => toggleCompare(p.id)} title="Compare">⚖️</button>
                      <button className="btn-quick" onClick={() => toggleWish(p.id)} title="Wishlist">{liked ? '❤️' : '🤍'}</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
