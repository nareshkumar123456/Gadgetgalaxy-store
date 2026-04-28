/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import { products } from '../data/products';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(() => {
    try {
      const local = JSON.parse(localStorage.getItem('nex_catalog'));
      if (local && local.length > 0) return local;
      return products;
    } catch { return products; }
  });

  const [cart, setCart] = useState(() => {
    try { 
      const parsed = JSON.parse(localStorage.getItem('nex_cart')) || []; 
      return parsed.filter(item => item && item.id);
    }
    catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nex_wish')) || []; }
    catch { return []; }
  });

  const [compareList, setCompareList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nex_compare')) || []; }
    catch { return []; }
  });

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nex_user')) || { name: 'Guest User', email: 'guest@example.com', role: 'customer' }; }
    catch { return { name: 'Guest User', email: 'guest@example.com', role: 'customer' }; }
  });

  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nex_orders')) || []; }
    catch { return []; }
  });

  const [toast, setToast] = useState({ show: false, msg: '' });

  useEffect(() => { localStorage.setItem('nex_catalog', JSON.stringify(catalog)); }, [catalog]);
  useEffect(() => { localStorage.setItem('nex_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('nex_wish', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('nex_compare', JSON.stringify(compareList)); }, [compareList]);
  useEffect(() => { localStorage.setItem('nex_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('nex_orders', JSON.stringify(orders)); }, [orders]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser({ ...user, ...data });
    showToast('Profile updated!');
  };

  const addProduct = (productData) => {
    const newId = catalog.length > 0 ? Math.max(...catalog.map(p => p.id)) + 1 : 1;
    setCatalog([{ ...productData, id: newId }, ...catalog]);
    showToast('Product added successfully!');
  };

  const deleteProduct = (id) => {
    setCatalog(catalog.filter(p => p.id !== id));
    showToast('Product deleted!');
  };

  const addToCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id, qty: 1 }];
    });
    showToast('Added to Cart!');
  };

  const changeQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const toggleWish = (id) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        showToast('Removed from Wishlist');
        return prev.filter(wId => wId !== id);
      }
      showToast('Added to Wishlist!');
      return [...prev, id];
    });
  };

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        showToast('Removed from Compare');
        return prev.filter(cId => cId !== id);
      }
      if (prev.length >= 3) {
        showToast('You can compare max 3 products');
        return prev;
      }
      showToast('Added to Compare!');
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(cId => cId !== id));
  };

  const placeOrder = (cartItems, total) => {
    const newOrder = {
      id: '#ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cartItems.map(item => `${item.qty}x ${item.name}`).join(', '),
      total: total,
      status: 'Processing',
      userName: user ? user.name : 'Guest',
      userEmail: user ? user.email : 'guest@example.com'
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    showToast('Order placed successfully!');
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} updated to ${status}`);
  };

  return (
    <StoreContext.Provider value={{
      catalog, cart, wishlist, compareList, user, orders, toast,
      addToCart, changeQty, clearCart,
      toggleWish, toggleCompare, removeFromCompare,
      login, logout, updateProfile, placeOrder, updateOrderStatus,
      addProduct, deleteProduct, showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};