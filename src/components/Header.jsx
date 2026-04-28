import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

export default function Header({ toggleCart, toggleCompare }) {
  const { cart, compareList, user } = useStore();
  const cartQty = cart.reduce((s, i) => s + i.qty, 0);
  const [search, setSearch] = useState('');

  // We emit search events by storing the term in a way that the Home component can read, 
  // or we can keep search state global. For simplicity, we'll let it stay in the Header and just pass it if needed, 
  // or we can add it to StoreContext if filtering happens globally. 
  // To keep it simple, let's use a URL param or custom event, but for now just basic UI.

  return (
    <header>
      <Link to="/" className="logo">
        <span className="logo-icon">⚡</span>Gadgetgalaxy
      </Link>
      <div className="search-wrap">
        <span className="si">🔍</span>
        <input 
          type="text" 
          placeholder="Search products, brands, categories…" 
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            window.dispatchEvent(new CustomEvent('searchUpdate', { detail: e.target.value }));
          }}
        />
      </div>
      <div className="hright">
        <button className="compare-btn" onClick={toggleCompare}>
          <span className="b-icon">⚖️</span>
          <span className="b-text">Compare</span>
          <span className="cbadge">{compareList.length}</span>
        </button>
        <button className="cart-btn" onClick={toggleCart}>
          <span className="b-icon">🛒</span>
          <span className="b-text">Cart</span>
          <span className={`cbadge ${cartQty > 0 ? 'bump' : ''}`}>{cartQty}</span>
        </button>
      </div>
    </header>
  );
}
