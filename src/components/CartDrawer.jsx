import { useStore } from '../context/StoreContext';


export default function CartDrawer({ open, onClose }) {
  const { cart, changeQty, placeOrder, showToast, catalog } = useStore();
  
  const cartItems = cart.map(item => {
    const p = catalog.find(x => x.id === item.id);
    return p ? { ...p, qty: item.qty } : null;
  }).filter(Boolean);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCheckout = () => {
    if (!cart.length) return;
    placeOrder(cartItems, total);
    showToast('🎉 Order placed! Thank you!');
    setTimeout(onClose, 900);
  };

  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cd-head">
          <h2>Your Cart 🛒</h2>
          <button className="cd-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="cd-items">
          {!cartItems.length && (
            <div className="cd-empty">
              <span>🛒</span>
              <p>Your cart is empty</p>
            </div>
          )}
          {cartItems.map(p => (
            <div className="cd-row" key={p.id}>
              <img className="cd-img" src={p.img} alt={p.name} />
              <div className="cd-info">
                <div className="cd-name">{p.name}</div>
                <div className="cd-price">₹{p.price.toLocaleString()} each</div>
                <div className="qty-row">
                  <button className="qty-b" onClick={() => changeQty(p.id, -1)}>−</button>
                  <span className="qty-n">{p.qty}</span>
                  <button className="qty-b" onClick={() => changeQty(p.id, 1)}>+</button>
                </div>
              </div>
              <button className="cd-del" onClick={() => changeQty(p.id, -99)} title="Remove">🗑</button>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="cd-foot">
            <div className="cd-srow"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
            <div className="cd-srow"><span>Shipping</span><span style={{ color: 'var(--accent3)' }}>FREE 🎉</span></div>
            <div className="cd-srow ttl"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            <button className="checkout-btn" onClick={handleCheckout}>🛍 Place Order →</button>
          </div>
        )}
      </div>
    </>
  );
}
