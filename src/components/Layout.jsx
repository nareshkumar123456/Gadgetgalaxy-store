import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import CartDrawer from './CartDrawer';
import CompareModal from './CompareModal';
import Toast from './Toast';

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <>
      <Header 
        toggleCart={() => setCartOpen(!cartOpen)} 
        toggleCompare={() => setCompareOpen(!compareOpen)} 
      />
      <main>
        <Outlet />
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} />
      <Toast />
    </>
  );
}
