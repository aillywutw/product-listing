import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <HashRouter>
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}