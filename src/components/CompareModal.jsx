import { useStore } from '../context/StoreContext';

export default function CompareModal({ open, onClose }) {
  const { compareList, removeFromCompare, addToCart, catalog } = useStore();

  const handleAddToCart = (id) => {
    addToCart(id);
    onClose();
  };

  const compareProducts = compareList.map(id => catalog.find(p => p.id === id)).filter(Boolean);

  return (
    <>
      <div className={`compare-overlay ${open ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`compare-modal ${open ? 'show' : ''}`}>
        <div className="cm-head">
          <h2>Compare Products ⚖️</h2>
          <button className="cm-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="cm-body">
          {!compareList.length ? (
            <div className="cm-empty">
              <span>⚖️</span>
              <p>Select products to compare</p>
              <small>Click the ⚖️ button on product cards to add up to 4 products</small>
            </div>
          ) : (
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Product</th>
                  {compareProducts.map(p => (
                    <th key={p.id}>
                      <div className="compare-prod">
                        <img src={p.img} alt={p.name} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23111827%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%23fff%22 font-size=%2212%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3EImage%3C/text%3E%3C/svg%3E"; }} />
                        <div className="prod-name">{p.name}</div>
                        <div className="prod-price">₹{p.price.toLocaleString()}</div>
                        <div className="prod-rating">
                          {'★'.repeat(Math.floor(p.rating))}{p.rating % 1 >= .5 ? '½' : ''}{'☆'.repeat(5 - Math.ceil(p.rating))} ({p.reviews})
                        </div>
                        <button className="compare-remove" onClick={() => removeFromCompare(p.id)}>Remove</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="spec-label">Brand</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">{p.brand}</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Category</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">{p.cat}</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Rating</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">{p.rating}/5</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Reviews</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">{p.reviews.toLocaleString()}</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Original Price</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">₹{p.old.toLocaleString()}</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Discount</td>
                  {compareProducts.map(p => <td key={p.id} className="spec-value">{Math.round((1 - p.price / p.old) * 100)}%</td>)}
                </tr>
                <tr>
                  <td className="spec-label">Add to Cart</td>
                  {compareProducts.map(p => (
                    <td key={p.id} className="spec-value">
                      <button className="btn-cart" onClick={() => handleAddToCart(p.id)}>🛒 Add</button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
